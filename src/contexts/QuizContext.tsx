import React, { createContext, useContext, useState, useEffect } from "react";
import { QuizAttempt, QuizAnalytics } from "@/types/quiz";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase";

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
  // Get auth context safely with try/catch to prevent errors in storyboards
  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (error) {
    console.log("Auth context not available, using null user");
  }

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [analytics, setAnalytics] = useState<QuizAnalytics>({
    totalQuizzes: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    bestScore: 0,
    worstScore: 0,
    averageTimePerQuiz: 0,
  });

  // Fetch quiz history from Supabase when user changes
  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (user) {
        // Fetch authenticated user's quiz history from Supabase
        const { data, error } = await supabase
          .from("quiz_attempts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching quiz history:", error);
          return;
        }

        if (data) {
          // Transform from database format to app format
          const formattedData: QuizAttempt[] = data.map((item) => ({
            id: item.id,
            userId: item.user_id,
            date: item.created_at,
            score: item.score,
            timeSpent: item.time_spent,
            totalQuestions: item.total_questions,
            correctAnswers: item.correct_answers,
            articleTitle: item.article_title,
            questions: item.questions,
          }));

          setQuizHistory(formattedData);
          setAnalytics(calculateAnalytics(formattedData));
        }
      } else {
        // For anonymous users, use localStorage
        const saved = localStorage.getItem("quizHistory");
        const localHistory = saved ? JSON.parse(saved) : [];
        const anonymousHistory = localHistory.filter(
          (attempt: QuizAttempt) => attempt.userId === "anonymous",
        );
        setQuizHistory(anonymousHistory);
        setAnalytics(calculateAnalytics(anonymousHistory));
      }
    };

    fetchQuizHistory();
  }, [user]);

  const addQuizAttempt = async (attempt: QuizAttempt) => {
    // Ensure the attempt has the current user's ID
    const attemptWithUserId = {
      ...attempt,
      userId: user?.id || "anonymous",
    };

    if (user) {
      // Save to Supabase for authenticated users
      const { error } = await supabase.from("quiz_attempts").insert({
        id: attemptWithUserId.id,
        user_id: user.id,
        created_at: new Date().toISOString(),
        score: attemptWithUserId.score,
        time_spent: attemptWithUserId.timeSpent,
        total_questions: attemptWithUserId.totalQuestions,
        correct_answers: attemptWithUserId.correctAnswers,
        article_title: attemptWithUserId.articleTitle || "Untitled Article",
        questions: attemptWithUserId.questions || null,
      });

      if (error) {
        console.error("Error saving quiz attempt:", error);
        // Fallback to local storage if Supabase insert fails
        const saved = localStorage.getItem("quizHistory");
        const localHistory = saved ? JSON.parse(saved) : [];
        const updatedHistory = [attemptWithUserId, ...localHistory];
        localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
      }
      // Always update local state
      setQuizHistory((prev) => [attemptWithUserId, ...prev]);
    } else {
      // For anonymous users, save to localStorage
      const saved = localStorage.getItem("quizHistory");
      const localHistory = saved ? JSON.parse(saved) : [];
      const updatedHistory = [attemptWithUserId, ...localHistory];
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));

      // Update local state with only anonymous attempts
      const anonymousHistory = updatedHistory.filter(
        (a: QuizAttempt) => a.userId === "anonymous",
      );
      setQuizHistory(anonymousHistory);
    }

    // Update analytics
    setAnalytics(calculateAnalytics([...quizHistory, attemptWithUserId]));
  };

  const clearHistory = async () => {
    if (user) {
      // Delete from Supabase for authenticated users
      const { error } = await supabase
        .from("quiz_attempts")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error clearing quiz history:", error);
      } else {
        setQuizHistory([]);
      }
    } else {
      // For anonymous users, clear from localStorage
      const saved = localStorage.getItem("quizHistory");
      if (saved) {
        const localHistory = JSON.parse(saved);
        const filteredHistory = localHistory.filter(
          (attempt: QuizAttempt) => attempt.userId !== "anonymous",
        );
        localStorage.setItem("quizHistory", JSON.stringify(filteredHistory));
        setQuizHistory([]);
      }
    }

    // Reset analytics
    setAnalytics({
      totalQuizzes: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      bestScore: 0,
      worstScore: 0,
      averageTimePerQuiz: 0,
    });
  };

  return (
    <QuizContext.Provider
      value={{ quizHistory, addQuizAttempt, clearHistory, analytics }}
    >
      {children}
    </QuizContext.Provider>
  );
};
