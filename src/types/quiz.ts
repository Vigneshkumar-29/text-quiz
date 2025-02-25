export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  timeSpent: number;
  totalQuestions: number;
  correctAnswers: number;
  articleTitle?: string;
}

export interface QuizAnswer {
  questionId: string;
  isCorrect: boolean;
}

export interface QuizAnalytics {
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  bestScore: number;
  worstScore: number;
  averageTimePerQuiz: number;
}
