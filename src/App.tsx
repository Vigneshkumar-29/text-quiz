import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import QuizGenerator from "./pages/quiz-generator";
import ContactPage from "./pages/contact";
import PricingPage from "./pages/pricing";
import AboutPage from "./pages/about";
import routes from "tempo-routes";
import { QuizProvider } from "./contexts/QuizContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthForm } from "./components/auth/AuthForm";
import { PrivateRoute } from "./components/auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        }
      >
        <QuizProvider>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz-generator"
              element={
                <PrivateRoute>
                  <QuizGenerator />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
        </QuizProvider>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
