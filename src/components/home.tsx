import React, { useState, useEffect } from "react";
import QuizHistory from "./QuizHistory";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureSection } from "@/components/ui/feature-section";
import { FeatureCard } from "@/components/ui/feature-card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "./ui/button";
import { AnimatedButton } from "./ui/animated-button";
import { GradientButton } from "./ui/gradient-button";
import { GlassCard } from "./ui/glass-card";
import { PurpleButton } from "./ui/purple-button";
import { TestimonialSection } from "./ui/testimonial-section";
import { History, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the URL has a history parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("view") === "history") {
      setShowHistory(true);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Container className="pt-20">
        {!showHistory ? (
          <>
            <div className="flex justify-end mb-4">
              <Button variant="outline" onClick={() => setShowHistory(true)}>
                <History className="w-4 h-4 mr-2" />
                Quiz History
              </Button>
            </div>
            <HeroSection />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 max-w-5xl mx-auto">
              <GlassCard
                className="text-center space-y-4"
                glowColor="rgba(99, 102, 241, 0.4)"
              >
                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Create Quizzes
                </h3>
                <p className="text-sm text-gray-500">
                  Generate questions from any text content
                </p>
              </GlassCard>

              <GlassCard
                className="text-center space-y-4"
                glowColor="rgba(139, 92, 246, 0.4)"
              >
                <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                  <History className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Track Progress
                </h3>
                <p className="text-sm text-gray-500">
                  Monitor your quiz history and performance
                </p>
              </GlassCard>

              <GlassCard
                className="text-center space-y-4"
                glowColor="rgba(79, 70, 229, 0.4)"
              >
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Instant Feedback
                </h3>
                <p className="text-sm text-gray-500">
                  Get immediate results with visual feedback
                </p>
              </GlassCard>
            </div>
            <TestimonialSection />
            <FeatureSection />
          </>
        ) : null}
        <div className="max-w-4xl mx-auto space-y-8">
          {showHistory && (
            <>
              <div className="mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setShowHistory(false)}
                  className="mb-4"
                >
                  ← Back to Home
                </Button>
                <h1 className="text-3xl font-bold mb-6 text-center">
                  Your Quiz History
                </h1>
                <QuizHistory />
              </div>
            </>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
