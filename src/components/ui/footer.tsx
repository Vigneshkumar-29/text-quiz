import { Container } from "./container";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Globe } from "./globe";

export function Footer() {
  const navigation = {
    product: [
      { name: "Create Quiz", href: "/quiz-generator" },
      { name: "PDF Q&A", href: "/pdf-qa" },
      //{ name: "View History", href: "/?view=history" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Support", href: "/support" },
      { name: "FAQs", href: "/faqs" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white relative mt-2">
      {/* Globe Section */}
      <div className="absolute inset-x-0 -top-29 flex justify-center  overflow-hidden pointer-events-none">
        <div className="relative w-[600px] h-[600px] opacity-29">
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-b from-white via-transparent to-transparent">
            <Globe className="scale-[2] transform translate-y-1/4" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>
      </div>

      {/* Footer Content */}
      <div className="border-t border-gray-100 relative z-10">
        <Container>
          <div className="relative pt-16 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Q</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">QuizGen</span>
                </div>
                <p className="mt-4 text-sm text-gray-600 max-w-xs">
                  Transform your learning experience with AI-powered quizzes and intelligent PDF analysis. Join thousands of educators and students worldwide.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a href="mailto:contact@quizgen.ai" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      contact@quizgen.ai
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a href="tel:+1-555-123-4567" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      San Francisco, CA 94103
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="https://github.com/quizgen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/quizgen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/quizgen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  © {currentYear} QuizGen. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Made with ❤️ for educators and learners worldwide
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
