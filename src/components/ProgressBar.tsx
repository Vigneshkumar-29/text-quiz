import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentQuestion?: number;
  totalQuestions?: number;
}

const ProgressBar = ({
  currentQuestion = 1,
  totalQuestions = 5,
}: ProgressBarProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-2 bg-gray-100" />
      <div className="flex justify-between mt-2">
        <div className="flex -space-x-2">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 ${i < currentQuestion ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-200 text-gray-400"}`}
              style={{ marginLeft: i > 0 ? "-0.5rem" : undefined }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
