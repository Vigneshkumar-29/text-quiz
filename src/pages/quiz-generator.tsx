import React from "react";
import ArticleInput from "@/components/quiz/ArticleInput";
import QuizInterface from "@/components/quiz/QuizInterface";
import { useState } from "react";
import { generateQuizQuestions } from "@/lib/openai";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { useAuth } from "@/contexts/AuthContext";
import { QuizQuestion } from "@/types/quiz";

const QuizGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [articleText, setArticleText] = useState("");
  const navigate = useNavigate();
  const { addQuizAttempt } = useQuiz();
  const { user } = useAuth();

  const handleArticleSubmit = async (text: string, numQuestions: number) => {
    try {
      setIsGenerating(true);
      setArticleText(text);
      const generatedQuestions = await generateQuizQuestions(
        text,
        numQuestions,
      );
      setQuestions(generatedQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error generating quiz:", error);
      if (error instanceof Error) {
        if (error.message.includes("429")) {
          alert(
            "OpenRouter API rate limit exceeded. Please try again later or check your API quota.",
          );
        } else if (
          error.message.includes("API key") ||
          error.message.includes("Authentication failed")
        ) {
          alert(
            "OpenRouter API key is not configured correctly or is invalid. Please check your API key in the project settings.",
          );
        } else {
          alert(error.message || "Failed to generate quiz. Please try again.");
        }
      } else {
        alert("Failed to generate quiz. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuizComplete = (
    results: Array<{ questionId: string; isCorrect: boolean }>,
    timeSpent: number,
  ) => {
    const correctAnswers = results.filter((r) => r.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);

    // Get the first 50 characters of the article as the title
    const articleTitle =
      articleText.substring(0, 50) + (articleText.length > 50 ? "..." : "");

    // Save the quiz attempt with the questions for later download
    addQuizAttempt({
      id: Date.now().toString(),
      userId: user?.id || "anonymous",
      date: new Date().toISOString(),
      score,
      timeSpent,
      totalQuestions: questions.length,
      correctAnswers,
      articleTitle,
      questions: questions,
    });

    setQuizStarted(false);
    setQuestions([]);
  };

  const downloadQuestions = () => {
    if (!questions.length) return;

    const questionsContent = questions
      .map((q, index) => {
        const correctOption = q.options.find(
          (opt) => opt.id === q.correctAnswerId,
        );
        return `Question ${index + 1}: ${q.text}\n\nOptions:\n${q.options
          .map(
            (opt) => `${opt.id === q.correctAnswerId ? "✓ " : "  "}${opt.text}`,
          )
          .join("\n")}\n\nCorrect Answer: ${correctOption?.text || ""}\n\n`;
      })
      .join("---\n\n");

    const blob = new Blob([questionsContent], {
      type: "text/plain;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `quiz_questions_${new Date().toLocaleDateString().replace(/\//g, "-")}.txt`;
    link.click();
  };

  const downloadAsPDF = () => {
    if (!questions.length) return;

    // Create a printable version of the quiz
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download the quiz as PDF");
      return;
    }

    const title =
      articleText.substring(0, 50) + (articleText.length > 50 ? "..." : "");
    const date = new Date().toLocaleDateString();

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - Quiz</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          h1 { text-align: center; color: #4338ca; }
          .meta { text-align: center; color: #666; margin-bottom: 30px; }
          .question { margin-bottom: 30px; }
          .question-text { font-weight: bold; margin-bottom: 10px; }
          .options { margin-left: 20px; }
          .correct { color: #059669; font-weight: bold; }
          .divider { border-top: 1px dashed #ccc; margin: 20px 0; }
          .answer-key { margin-top: 50px; border-top: 2px solid #000; padding-top: 20px; }
          @media print {
            .no-print { display: none; }
            body { padding: 0; }
            .page-break { page-break-after: always; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: center; margin-bottom: 20px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #4338ca; color: white; border: none; border-radius: 4px; cursor: pointer;">Print/Save as PDF</button>
        </div>
        
        <h1>${title}</h1>
        <div class="meta">Generated on ${date} | ${questions.length} questions</div>
        
        <div class="questions">
    `);

    // Add questions without answers first
    questions.forEach((q, index) => {
      printWindow.document.write(`
        <div class="question">
          <div class="question-text">${index + 1}. ${q.text}</div>
          <div class="options">
      `);

      q.options.forEach((opt) => {
        printWindow.document.write(
          `<div>${String.fromCharCode(65 + parseInt(opt.id) - 1)}. ${opt.text}</div>`,
        );
      });

      printWindow.document.write(`
          </div>
        </div>
        ${index < questions.length - 1 ? '<div class="divider"></div>' : ""}
      `);
    });

    // Add page break and answer key
    printWindow.document.write(`
        </div>
        
        <div class="page-break"></div>
        
        <div class="answer-key">
          <h2>Answer Key</h2>
    `);

    // Add answers
    questions.forEach((q, index) => {
      const correctOption = q.options.find(
        (opt) => opt.id === q.correctAnswerId,
      );
      const correctLetter = String.fromCharCode(
        65 + parseInt(q.correctAnswerId) - 1,
      );

      printWindow.document.write(`
        <div>${index + 1}. ${correctLetter}. <span class="correct">${correctOption?.text || ""}</span></div>
      `);
    });

    printWindow.document.write(`
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30">
      <Header />
      <Container className="pt-20">
        <div className="py-6 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="hover:bg-white/50 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {quizStarted && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={downloadQuestions}
                className="border-purple-200 hover:border-purple-300 hover:bg-purple-50/50"
              >
                <FileDown className="mr-2 h-4 w-4 text-purple-600" />
                Download as Text
              </Button>
              <Button
                variant="outline"
                onClick={downloadAsPDF}
                className="border-purple-200 hover:border-purple-300 hover:bg-purple-50/50"
              >
                <Download className="mr-2 h-4 w-4 text-purple-600" />
                Download as PDF
              </Button>
            </div>
          )}
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Article to Quiz Generator
            </h1>
            <p className="text-gray-500 mt-2">
              Upload or paste an article to generate interactive quiz questions
            </p>
          </div>

          {!quizStarted ? (
            <ArticleInput
              onSubmit={handleArticleSubmit}
              isLoading={isGenerating}
            />
          ) : (
            <QuizInterface
              questions={questions}
              onQuizComplete={handleQuizComplete}
            />
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default QuizGenerator;
