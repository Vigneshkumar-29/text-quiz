import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Trophy, Clock, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  onRetry: () => void;
}

const QuizResults = ({
  correctAnswers = 0,
  totalQuestions = 0,
  timeSpent = 0,
  onRetry = () => {},
}: QuizResultsProps) => {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg border-0 rounded-xl space-y-6 transition-all hover:shadow-xl">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Quiz Complete!</h2>

        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-3xl font-bold text-primary">{score}%</p>
            <p className="text-sm text-gray-600">Score</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {correctAnswers}/{totalQuestions}
            </p>
            <p className="text-sm text-gray-600">Correct Answers</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            Time: {minutes}m {seconds}s
          </span>
        </div>
      </div>

      <Button onClick={onRetry} className="w-full mt-6" variant="outline">
        <RotateCcw className="w-4 h-4 mr-2" />
        Try Another Quiz
      </Button>
    </Card>
  );
};

export default QuizResults;
