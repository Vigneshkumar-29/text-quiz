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
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                onClick={() =>
                  alert("Google sign-in would be implemented here")
                }
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.7195C15.4804 13.2905 14.7538 14.3892 13.6914 15.0873V17.586H16.9612C18.8883 15.8443 19.9996 13.2722 19.9996 10.2297Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2002 20.0001C12.9518 20.0001 15.2723 19.1142 16.9645 17.5858L13.6947 15.0872C12.7702 15.6981 11.5786 16.0408 10.2035 16.0408C7.54261 16.0408 5.28746 14.2823 4.45703 11.9165H1.08008V14.4923C2.78225 17.8691 6.29251 20.0001 10.2002 20.0001Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.45374 11.9164C4.25372 11.3053 4.14273 10.6599 4.14273 9.99984C4.14273 9.33975 4.25372 8.69439 4.45374 8.08328V5.50745H1.07679C0.390886 6.85936 0 8.38778 0 9.99984C0 11.6119 0.390886 13.1403 1.07679 14.4922L4.45374 11.9164Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2002 3.95917C11.6547 3.95917 12.9653 4.4659 14.0039 5.45262L16.9059 2.60417C15.2645 0.990845 12.9518 0 10.2002 0C6.29251 0 2.78225 2.13104 1.08008 5.50777L4.45703 8.0836C5.28746 5.71774 7.54261 3.95917 10.2002 3.95917Z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors"
                onClick={() =>
                  alert("Facebook sign-in would be implemented here")
                }
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
                Sign in with Facebook
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-1 bg-white text-gray-500 rounded-full border border-gray-100 shadow-sm">
                  Or continue with email
                </span>
              </div>
            </div>
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
