import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import QuizResults from "./QuizResults";
import { Timer, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface Question {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctAnswerId: string;
}

interface QuizInterfaceProps {
  questions?: Question[];
  onQuizComplete?: (
    results: Array<{ questionId: string; isCorrect: boolean }>,
    timeSpent: number,
  ) => void;
}

const QuizInterface = ({
  questions = [],
  onQuizComplete = () => {},
}: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; isCorrect: boolean }>
  >([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isComplete) {
        setTimeSpent((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelected = (answerId: string) => {
    if (!currentQuestion || isAnswered) return;

    setSelectedAnswerId(answerId);
    setIsAnswered(true);

    const isCorrect = answerId === currentQuestion.correctAnswerId;
    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, isCorrect },
    ];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerId("");
        setIsAnswered(false);
      } else {
        setIsComplete(true);
        onQuizComplete(newAnswers, timeSpent);
      }
    }, 1500);
  };

  if (!questions?.length || !currentQuestion) {
    return null;
  }

  if (isComplete) {
    return (
      <QuizResults
        correctAnswers={answers.filter((a) => a.isCorrect).length}
        totalQuestions={questions.length}
        timeSpent={timeSpent}
        onRetry={() => onQuizComplete(answers, timeSpent)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
          onClick={() => onQuizComplete(answers, timeSpent)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit Quiz
        </Button>
        <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
          <Timer className="w-4 h-4" />
          <span className="font-medium">
            {Math.floor(timeSpent / 60)}:
            {(timeSpent % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <ProgressBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="relative">
        <QuestionCard
          question={currentQuestion.text}
          options={currentQuestion.options}
          correctAnswerId={currentQuestion.correctAnswerId}
          onAnswerSelected={handleAnswerSelected}
          isAnswered={isAnswered}
          selectedAnswerId={selectedAnswerId}
        />
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        Tip: Click on an answer to proceed to the next question
      </div>
    </div>
  );
};

export default QuizInterface;
