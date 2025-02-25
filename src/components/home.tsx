import React, { useState } from "react";
import ArticleInput from "./ArticleInput";
import QuizInterface from "./QuizInterface";
import QuizHistory from "./QuizHistory";
import { generateQuizQuestions } from "@/lib/openai";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureSection } from "@/components/ui/feature-section";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "./ui/button";
import { History } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctAnswerId: string;
}

const Home = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { addQuizAttempt } = useQuiz();

  const handleArticleSubmit = async (text: string, numQuestions: number) => {
    try {
      setIsGenerating(true);
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
        } else if (error.message.includes("API key")) {
          alert(
            "OpenRouter API key is not configured correctly. Please check your .env file.",
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

    addQuizAttempt({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      timeSpent,
      totalQuestions: questions.length,
      correctAnswers,
    });

    setQuizStarted(false);
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Container>
        {!quizStarted && !showHistory ? (
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="w-4 h-4 mr-2" />
                Quiz History
              </Button>
            </div>
            <HeroSection />
            <FeatureSection />
          </>
        ) : null}

        <div className="max-w-4xl mx-auto space-y-8">
          {showHistory ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setShowHistory(false)}
                className="mb-4"
              >
                ← Back to Quiz
              </Button>
              <QuizHistory />
            </>
          ) : !quizStarted ? (
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

export default Home;
