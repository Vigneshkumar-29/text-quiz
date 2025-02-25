import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, X } from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question?: string;
  options?: Option[];
  correctAnswerId?: string;
  onAnswerSelected?: (answerId: string) => void;
  isAnswered?: boolean;
  selectedAnswerId?: string;
}

const QuestionCard = ({
  question = "Sample question",
  options = [],
  correctAnswerId = "",
  onAnswerSelected = () => {},
  isAnswered = false,
  selectedAnswerId = "",
}: QuestionCardProps) => {
  const handleAnswerClick = (answerId: string) => {
    if (isAnswered) return;
    onAnswerSelected(answerId);

    if (answerId === correctAnswerId) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const getOptionClassName = (optionId: string) => {
    if (!isAnswered) {
      return "hover:bg-gray-50 hover:border-gray-300 hover:shadow-md";
    }
    if (optionId === correctAnswerId) {
      return "bg-green-50 border-green-500 shadow-green-100";
    }
    if (optionId === selectedAnswerId && optionId !== correctAnswerId) {
      return "bg-red-50 border-red-500 shadow-red-100";
    }
    return "opacity-50";
  };

  return (
    <Card className="w-full p-8 bg-white shadow-lg border-0 rounded-xl transition-all">
      <AnimatePresence mode="wait">
        <motion.div
          key={question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-900">{question}</h2>

          <div className="space-y-3">
            {options.map((option) => (
              <motion.div
                key={option.id}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                className="relative"
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left p-4 h-auto ${getOptionClassName(option.id)} transition-all duration-200`}
                  onClick={() => handleAnswerClick(option.id)}
                  disabled={isAnswered}
                >
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm">
                    {String.fromCharCode(65 + parseInt(option.id) - 1)}
                  </span>
                  {option.text}
                  {isAnswered && option.id === correctAnswerId && (
                    <Check className="ml-auto h-5 w-5 text-green-500" />
                  )}
                  {isAnswered &&
                    option.id === selectedAnswerId &&
                    option.id !== correctAnswerId && (
                      <X className="ml-auto h-5 w-5 text-red-500" />
                    )}
                </Button>
              </motion.div>
            ))}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${selectedAnswerId === correctAnswerId ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              <p className="text-sm font-medium">
                {selectedAnswerId === correctAnswerId
                  ? "✨ Correct!"
                  : "❌ Incorrect"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default QuestionCard;
