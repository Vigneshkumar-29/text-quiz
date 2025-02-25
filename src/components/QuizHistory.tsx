import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/QuizContext";
import { Download, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const QuizHistory = () => {
  const { quizHistory, clearHistory, analytics } = useQuiz();

  const exportHistory = () => {
    const csvContent = [
      ["Date", "Score", "Time Spent", "Total Questions", "Correct Answers"],
      ...quizHistory.map((attempt) => [
        attempt.date,
        `${attempt.score}%`,
        `${Math.floor(attempt.timeSpent / 60)}m ${attempt.timeSpent % 60}s`,
        attempt.totalQuestions,
        attempt.correctAnswers,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quiz_history.csv";
    link.click();
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz History</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportHistory}
            disabled={quizHistory.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={clearHistory}
            disabled={quizHistory.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className="text-2xl font-bold">
            {analytics.averageScore.toFixed(1)}%
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Quizzes</h3>
          <p className="text-2xl font-bold">{analytics.totalQuizzes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Best Score</h3>
          <p className="text-2xl font-bold">{analytics.bestScore}%</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Questions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizHistory.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell>
                {new Date(attempt.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{attempt.score}%</TableCell>
              <TableCell>
                {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
              </TableCell>
              <TableCell>
                {attempt.correctAnswers}/{attempt.totalQuestions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {quizHistory.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No quiz history available yet. Complete a quiz to see your results
          here.
        </div>
      )}
    </Card>
  );
};

export default QuizHistory;
