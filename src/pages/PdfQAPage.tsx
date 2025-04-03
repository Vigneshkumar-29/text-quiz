import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Send, FileText, Loader2, X, MessageSquare, 
  History, Clock, ArrowLeft, Plus, Trash2, Home,
  ChevronLeft, Settings, Sparkles, Download, Share2,
  HelpCircle, Bot, UserCircle, Menu, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import * as pdfjs from 'pdfjs-dist';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from 'react-router-dom';
import { Save } from 'lucide-react';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  id: string;
  user_id: string;
  file_name: string;
  messages: Message[];
  created_at: string;
}

const API_KEY = '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';

const PdfQAPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      loadChatHistory();
      // Load selected chat if coming from history
      const selectedChat = location.state?.selectedChat;
      if (selectedChat) {
        setMessages(selectedChat.messages);
        // Set other relevant state
        toast({
          title: "Chat Loaded",
          description: `Loaded conversation about "${selectedChat.file_name}"`,
        });
      }
    }
  }, [user, location.state]);

  useEffect(() => {
    if (messages.length > 0 && user && file) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      const timeout = setTimeout(() => {
        saveChatHistory();
      }, 3000);
      setAutoSaveTimeout(timeout);
    }
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [messages, user, file]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_chat_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatHistory(data || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
      toast({
        title: "Error loading history",
        description: "Could not load chat history. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveChatHistory = async () => {
    if (!user || !file || messages.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('pdf_chat_history')
        .insert([
          {
            user_id: user.id,
            file_name: file.name,
            messages: messages,
            created_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setChatHistory(prev => [data, ...prev]);
      toast({
        title: "Chat saved",
        description: "Your conversation has been saved to history.",
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
      toast({
        title: "Error saving chat",
        description: "Could not save chat history. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadPreviousChat = (chat: ChatHistory) => {
    setMessages(chat.messages);
    setShowHistory(false);
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const progress = (i / pdf.numPages) * 100;
        setUploadProgress(progress);
        
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        fullText += `[Page ${i}] ` + pageText + '\n\n';
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.includes('pdf')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setFile(selectedFile);
    setUploadProgress(0);
    setMessages([]);

    try {
      const text = await extractTextFromPdf(selectedFile);
      setFileContent(text);
      
      setMessages([{
        role: 'assistant',
        content: 'I\'ve processed your PDF. What would you like to know about it?'
      }]);
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Error processing PDF",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
      setFile(null);
    } finally {
      setIsLoading(false);
      setUploadProgress(100);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !fileContent || isLoading) return;

    const userQuestion = question.trim();
    setQuestion('');
    setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'PDF Q&A Assistant'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: "system",
              content: `You are analyzing a PDF document. Here's the content:\n\n${fileContent.substring(0, 12000)}\n\nProvide clear, accurate answers based only on this content. If information isn't in the document, say so.`
            },
            { role: "user", content: userQuestion }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error?.message || 'Failed to get response');
      }

      const answer = data.choices?.[0]?.message?.content;
      if (!answer) {
        throw new Error('No response content received');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get an answer',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveChat = async () => {
    await saveChatHistory();
  };

  const handleViewHistory = () => {
    setShowHistory(true);
  };

  const handleLoadChat = (chat: ChatHistory) => {
    loadPreviousChat(chat);
  };

  const startNewConversation = () => {
    setFile(null);
    setFileContent('');
    setMessages([]);
    setQuestion('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the chat load when clicking delete
    try {
      const { error } = await supabase
        .from('pdf_chat_history')
        .delete()
        .eq('id', chatId);

      if (error) throw error;

      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      toast({
        title: "Chat deleted",
        description: "The conversation has been removed from history.",
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: "Error deleting chat",
        description: "Could not delete chat history. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Professional header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/tools')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-bold text-xl">PDF Assistant</h1>
              <p className="text-xs text-purple-200">AI-powered document analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
              onClick={startNewConversation}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '280px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={startNewConversation}
                  >
                    <Plus className="h-4 w-4 mr-2 text-gray-500" />
                    New Conversation
                  </Button>
                  
                  {chatHistory.length > 0 ? (
                    chatHistory.map((chat) => (
                      <div key={chat.id} className="group relative">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left truncate pr-10 text-sm hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => handleLoadChat(chat)}
                        >
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="truncate">{chat.file_name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 hover:bg-red-50"
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      <History className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                      <p>No conversation history yet</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/')}>
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content area */}
          <div className="flex-1 min-w-0 flex flex-col h-[calc(100vh-8rem)]">
            {!file ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="max-w-md w-full mx-auto">
                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your PDF</h2>
                    <p className="text-gray-600 max-w-sm mx-auto">
                      Get instant answers and insights from your documents with our AI assistant
                    </p>
                  </div>
                  
                  <Card className="bg-white shadow-xl border-0 overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="pdf-upload"
                      ref={fileInputRef}
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="flex flex-col items-center gap-4 p-8 cursor-pointer border-2 border-dashed border-purple-200 rounded-lg hover:border-purple-400 transition-all duration-300 m-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-base font-medium text-gray-900 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF files up to 20MB
                        </p>
                      </div>
                    </label>
                    
                    <div className="bg-purple-50/50 p-4 border-t border-purple-100">
                      <div className="flex items-center gap-2 text-sm text-purple-800">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>Our AI can analyze your document and answer questions about it</span>
                      </div>
                    </div>
                  </Card>
                  
                  {chatHistory.length > 0 && (
                    <div className="mt-8 text-center">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Or continue a previous conversation</h3>
                      <Button
                        variant="outline"
                        className="border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                        onClick={handleViewHistory}
                      >
                        <History className="h-4 w-4 mr-2" />
                        View History
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <>
                {/* PDF Info Banner */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <Progress value={uploadProgress} className="w-32 h-1.5 mt-1" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      onClick={handleSaveChat}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                      onClick={startNewConversation}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Close
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div 
                  className="flex-1 bg-white rounded-xl shadow-md p-4 mb-4 overflow-y-auto"
                  ref={chatContainerRef}
                >
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Bot className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Ask questions about your PDF
                      </h3>
                      <p className="text-gray-600 max-w-md">
                        I've processed your document. Go ahead and ask me anything about its contents!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          
                          <div
                            className={`rounded-2xl p-4 max-w-[75%] ${
                              message.role === 'user'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                              <UserCircle className="h-4 w-4 text-indigo-600" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="bg-gray-100 rounded-2xl p-4 w-16">
                            <div className="flex space-x-1.5">
                              <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Question Input */}
                <div className="bg-white rounded-xl shadow-md p-3 relative">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about your PDF..."
                    className="pr-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit(e)}
                  />
                  <Button
                    onClick={handleQuestionSubmit}
                    disabled={!question || isLoading}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-8 w-8 p-0 rounded-full"
                  >
                    <Send className="h-3.5 w-3.5 text-white" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* History Dialog - Keep this part as is */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-2xl">
                <History className="w-6 h-6 text-purple-600" />
                Chat History
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {chatHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No chat history yet</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card
                    className="p-4 hover:bg-purple-50/50 cursor-pointer transition-all duration-200 hover:shadow-md relative"
                    onClick={() => handleLoadChat(chat)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900">{chat.file_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(chat.created_at).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {chat.messages[0].content}
                    </p>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfQAPage; 