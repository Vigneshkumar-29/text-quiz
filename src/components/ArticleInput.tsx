import React, { useState, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2, Upload, FileText } from "lucide-react";
import { useDropzone } from "react-dropzone";
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
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg border-0 rounded-xl transition-all hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Article to Quiz Generator
          </h2>
          <p className="text-gray-500">
            Upload a text file or paste your text below
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? "Drop your file here"
                  : "Drag & drop your file here, or click to select"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported format: TXT (max 1MB)
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {fileName && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
            <FileText className="h-4 w-4" />
            <span>{fileName}</span>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or paste your text
            </span>
          </div>
        </div>

        <Textarea
          placeholder="Paste your article text here..."
          className="min-h-[200px] p-4"
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
            className="flex-[2]"
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
