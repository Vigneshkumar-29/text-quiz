const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const callOpenRouter = async (
  messages: Array<{ role: string; content: string }>,
) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured");
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Article Quiz Generator",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 401) {
      throw new Error(
        "Authentication failed: Invalid API key. Please check your OpenRouter API key.",
      );
    }
    throw new Error(
      error.message || `API call failed with status: ${response.status}`,
    );
  }

  return response.json();
};

export interface QuizQuestion {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctAnswerId: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      if (retries >= maxRetries || !error?.message?.includes("429")) {
        throw error;
      }
      const delayTime = initialDelay * Math.pow(2, retries);
      console.log(`Rate limited. Retrying in ${delayTime}ms...`);
      await delay(delayTime);
      retries++;
    }
  }
}

export async function generateQuizQuestions(
  articleText: string,
  numQuestions: number = 5,
): Promise<QuizQuestion[]> {
  if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured");
  }

  if (!articleText.trim()) {
    throw new Error("Article text is required");
  }

  const prompt = `Generate a multiple choice quiz with ${numQuestions} questions based on this article. For each question, provide 4 options with only one correct answer.

Article: ${articleText}

Respond with a JSON array of questions in this exact format:
[
  {
    "text": "What is...?",
    "options": [
      { "text": "Option 1" },
      { "text": "Option 2" },
      { "text": "Option 3" },
      { "text": "Option 4" }
    ],
    "correctAnswerIndex": 0
  }
]

Very important:
1. Each question must have exactly 4 options
2. correctAnswerIndex must be a number between 0-3
3. Do not include any text before or after the JSON array
4. Make sure the response is valid JSON
5. Questions should test understanding, not just memorization`;

  const response = await retryWithExponentialBackoff(async () => {
    return await callOpenRouter([{ role: "user", content: prompt }]);
  });

  let rawQuestions;
  try {
    // Extract the content from the response
    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in API response");
    }
    // Parse the JSON content
    // Clean the content string to ensure it only contains the JSON array
    const jsonStr = content.substring(
      content.indexOf("["),
      content.lastIndexOf("]") + 1,
    );
    rawQuestions = JSON.parse(jsonStr);
    if (!Array.isArray(rawQuestions)) {
      throw new Error("Invalid response format");
    }
    // Validate the structure of each question
    rawQuestions.forEach((q: any, idx: number) => {
      if (
        !q.text ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        typeof q.correctAnswerIndex !== "number" ||
        q.correctAnswerIndex < 0 ||
        q.correctAnswerIndex > 3
      ) {
        throw new Error(`Invalid question format at index ${idx}`);
      }
    });
  } catch (error) {
    console.error("Error parsing API response:", error);
    throw new Error("Failed to parse quiz questions from API response");
  }

  try {
    return rawQuestions.map((q: any, index: number) => {
      if (
        !q.text ||
        !Array.isArray(q.options) ||
        typeof q.correctAnswerIndex !== "number"
      ) {
        throw new Error("Invalid question format in API response");
      }
      return {
        id: String(index + 1),
        text: q.text,
        options: q.options.map((opt: any, optIndex: number) => ({
          id: String(optIndex + 1),
          text: opt.text || String(opt),
        })),
        correctAnswerId: String(q.correctAnswerIndex + 1),
      };
    });
  } catch (error) {
    console.error("Error processing questions:", error);
    throw new Error("Failed to process quiz questions");
  }
}
