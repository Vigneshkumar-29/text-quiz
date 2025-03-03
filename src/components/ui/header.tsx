import { Button } from "./button";
import { Container } from "./container";
import { History, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Q</span>
            </div>
            <Link to="/" className="text-xl font-bold text-gray-900">
              QuizGen
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
