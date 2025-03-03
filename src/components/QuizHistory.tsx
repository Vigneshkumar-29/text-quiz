import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/QuizContext";
import { Download, Trash2, FileDown, Printer } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user } = useAuth();

  // Filter history to only show current user's history
  const userHistory = quizHistory.filter(
    (attempt) =>
      attempt.userId === user?.id || (!attempt.userId && user === null),
  );

  const exportHistory = () => {
    const csvContent = [
      [
        "Date",
        "Score",
        "Time Spent",
        "Total Questions",
        "Correct Answers",
        "Article Title",
      ],
      ...userHistory.map((attempt) => [
        new Date(attempt.date).toLocaleDateString(),
        `${attempt.score}%`,
        `${Math.floor(attempt.timeSpent / 60)}m ${attempt.timeSpent % 60}s`,
        attempt.totalQuestions,
        attempt.correctAnswers,
        attempt.articleTitle || "Untitled Article",
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

  const exportQuizQuestions = (attemptId: string) => {
    const attempt = userHistory.find((a) => a.id === attemptId);
    if (!attempt || !attempt.questions) return;

    const questionsContent = attempt.questions
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
    link.download = `quiz_questions_${new Date(attempt.date).toLocaleDateString().replace(/\//g, "-")}.txt`;
    link.click();
  };

  const exportQuizAsPDF = (attemptId: string) => {
    const attempt = userHistory.find((a) => a.id === attemptId);
    if (!attempt || !attempt.questions) return;

    // Create a printable version of the quiz
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download the quiz as PDF");
      return;
    }

    const title = attempt.articleTitle || "Quiz";
    const date = new Date(attempt.date).toLocaleDateString();

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
        <div class="meta">Generated on ${date} | ${attempt.totalQuestions} questions</div>
        
        <div class="questions">
    `);

    // Add questions without answers first
    attempt.questions.forEach((q, index) => {
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
        ${index < attempt.questions.length - 1 ? '<div class="divider"></div>' : ""}
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
    attempt.questions.forEach((q, index) => {
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
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Quiz History</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportHistory}
            disabled={userHistory.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={clearHistory}
            disabled={userHistory.length === 0}
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
            {userHistory.length > 0
              ? (
                  userHistory.reduce((sum, attempt) => sum + attempt.score, 0) /
                  userHistory.length
                ).toFixed(1)
              : "0"}
            %
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Quizzes</h3>
          <p className="text-2xl font-bold">{userHistory.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Best Score</h3>
          <p className="text-2xl font-bold">
            {userHistory.length > 0
              ? Math.max(...userHistory.map((a) => a.score))
              : "0"}
            %
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Article</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userHistory.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell>
                {new Date(attempt.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {attempt.articleTitle || "Untitled Article"}
              </TableCell>
              <TableCell>{attempt.score}%</TableCell>
              <TableCell>
                {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
              </TableCell>
              <TableCell>
                {attempt.correctAnswers}/{attempt.totalQuestions}
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => exportQuizQuestions(attempt.id)}
                    disabled={!attempt.questions}
                    title="Download as text file"
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => exportQuizAsPDF(attempt.id)}
                    disabled={!attempt.questions}
                    title="Download as printable PDF"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userHistory.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No quiz history available yet. Complete a quiz to see your results
          here.
        </div>
      )}
    </Card>
  );
};

export default QuizHistory;
