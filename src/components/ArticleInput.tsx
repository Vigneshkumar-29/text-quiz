import React, { useState, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2, Upload, FileText } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { FileUpload } from "./ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ArticleInputProps {
  onSubmit?: (text: string, numQuestions: number) => void;
  isLoading?: boolean;
}

const ArticleInput = ({
  onSubmit = () => {},
  isLoading = false,
}: ArticleInputProps) => {
  const [articleText, setArticleText] = useState("");
  const [fileName, setFileName] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      setFileName(file.name);
      setError("");

      // Handle text files
      if (file.type === "text/plain") {
        const text = await file.text();
        setArticleText(text);
        return;
      }

      // For now, only support .txt files
      setError("Currently only .txt files are supported");
      setFileName("");
      setArticleText("");
    } catch (err) {
      console.error("Error reading file:", err);
      setError(err instanceof Error ? err.message : "Error reading file");
      setFileName("");
      setArticleText("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
    maxSize: 1024 * 1024, // 1MB max file size
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (articleText.trim()) {
      setError("");
      onSubmit(articleText, parseInt(numQuestions));
    } else {
      setError("Please enter some text or upload a file");
    }
  };

  return (
    <Card
      className="w-full max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md shadow-lg border border-white/30 rounded-xl transition-all hover:shadow-xl"
      style={{ boxShadow: "0 8px 32px rgba(138, 63, 252, 0.2)" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Article to Quiz Generator
          </h2>
          <p className="text-gray-500">
            Upload a text file or paste your text below
          </p>
        </div>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <FileUpload
            onDrop={onDrop}
            isDragActive={isDragActive}
            fileName={fileName}
            error={error}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 py-1 bg-white text-gray-500 rounded-full border border-gray-100 shadow-sm">
              Or paste your text
            </span>
          </div>
        </div>

        <Textarea
          placeholder="Paste your article text here..."
          className="min-h-[200px] p-4 border-gray-200 focus:border-purple-300 focus:ring-purple-300 transition-all"
          value={articleText}
          onChange={(e) => {
            setArticleText(e.target.value);
            setError("");
          }}
          disabled={isLoading}
        />

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={numQuestions} onValueChange={setNumQuestions}>
              <SelectTrigger>
                <SelectValue placeholder="Number of questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Questions</SelectItem>
                <SelectItem value="5">5 Questions</SelectItem>
                <SelectItem value="7">7 Questions</SelectItem>
                <SelectItem value="10">10 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading || !articleText.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ArticleInput;
