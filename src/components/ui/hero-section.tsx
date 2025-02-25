import { Button } from "./button";
import { motion } from "framer-motion";
import { FileText, Upload, History, Download } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
          <div className="h-[600px] w-[1000px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl opacity-20 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Transform Content into
              <span className="block text-indigo-600 mt-2">
                Interactive Quizzes
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Upload documents or paste text to create engaging quizzes
              instantly. Support for PDF, Word, PowerPoint, and more.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="px-8 text-lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Document
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-lg">
                <History className="mr-2 h-5 w-5" />
                View History
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>PDF, DOC, PPT</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span>Export Results</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Upload your document
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Drag and drop or click to select
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  id="file-upload"
                />
                <Button variant="outline" className="mt-4">
                  Choose File
                </Button>
                <p className="text-xs text-gray-400">
                  or paste your text below
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
