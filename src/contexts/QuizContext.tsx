import React, { createContext, useContext, useState, useEffect } from "react";
import { QuizAttempt, QuizAnalytics } from "@/types/quiz";

interface QuizContextType {
  quizHistory: QuizAttempt[];
  addQuizAttempt: (attempt: QuizAttempt) => void;
  clearHistory: () => void;
  analytics: QuizAnalytics;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

const calculateAnalytics = (history: QuizAttempt[]): QuizAnalytics => {
  if (history.length === 0) {
    return {
      totalQuizzes: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      bestScore: 0,
      worstScore: 0,
      averageTimePerQuiz: 0,
    };
  }

  const scores = history.map((h) => h.score);
  const totalTimeSpent = history.reduce((acc, h) => acc + h.timeSpent, 0);

  return {
    totalQuizzes: history.length,
    averageScore: scores.reduce((a, b) => a + b, 0) / history.length,
    totalTimeSpent,
    bestScore: Math.max(...scores),
    worstScore: Math.min(...scores),
    averageTimePerQuiz: totalTimeSpent / history.length,
  };
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [analytics, setAnalytics] = useState<QuizAnalytics>(
    calculateAnalytics(quizHistory),
  );

  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
    setAnalytics(calculateAnalytics(quizHistory));
  }, [quizHistory]);

  const addQuizAttempt = (attempt: QuizAttempt) => {
    setQuizHistory((prev) => [attempt, ...prev]);
  };

  const clearHistory = () => {
    setQuizHistory([]);
  };

  return (
    <QuizContext.Provider
      value={{ quizHistory, addQuizAttempt, clearHistory, analytics }}
    >
      {children}
    </QuizContext.Provider>
  );
};
