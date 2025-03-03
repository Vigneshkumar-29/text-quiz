import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await signUp(email, password);
        setSuccessMessage(
          "Account created successfully! Please check your email to confirm your registration.",
        );
        setEmail("");
        setPassword("");
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <Card
          className="p-8 bg-white/90 backdrop-blur-md shadow-lg border border-white/30 rounded-xl transition-all hover:shadow-xl"
          style={{ boxShadow: "0 8px 32px rgba(138, 63, 252, 0.2)" }}
        >
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 mb-4">
              <span className="text-2xl font-bold text-white">Q</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500">
              {isSignUp
                ? "Sign up to start creating quizzes"
                : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200"
              >
                {successMessage}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isSignUp ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>
                  {isSignUp ? (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" /> Sign In
                    </>
                  )}
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-purple-600 hover:text-purple-500 font-medium"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
