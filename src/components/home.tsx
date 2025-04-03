import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "./ui/button";
import { GlassCard } from "./ui/glass-card";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { PathsBackground } from "./ui/background-paths";
import {
  BookOpen,
  FileQuestion,
  History,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Image,
  Lightbulb,
  Target,
  Trophy,
  Quote,
  BarChart3,
  Cpu,
  PenTool,
  Monitor,
  ChevronDown,
  CheckCircle2,
  Layers,
  Rocket,
  ArrowUpRight
} from "lucide-react";
import QuizHistory from "./QuizHistory";
import { TestimonialsSection } from "./ui/testimonials-section";

const Home = () => {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("view") === "history") {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  }, [location]);

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      title: "AI-Powered Quiz Creation",
      description: "Transform any text into dynamic, personalized quizzes in seconds with our advanced natural language processing."
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-indigo-600" />,
      title: "Smart PDF Analysis",
      description: "Extract key insights from documents instantly with our intelligent document processing system."
    },
    {
      icon: <Image className="h-6 w-6 text-emerald-600" />,
      title: "Visual Learning Engine",
      description: "Decode complex diagrams and visual information with our state-of-the-art computer vision technology."
    },
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: "Adaptive Learning Path",
      description: "Experience tailored education that evolves with your progress using cutting-edge machine learning algorithms."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-rose-600" />,
      title: "Detailed Analytics",
      description: "Track your learning journey with comprehensive performance metrics and personalized insights."
    },
    {
      icon: <Cpu className="h-6 w-6 text-amber-600" />,
      title: "Neural Knowledge Engine",
      description: "Access our powerful AI system that understands context and provides intelligent learning assistance."
    }
  ];

  const benefits = [
    {
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      title: "Enhanced Comprehension",
      description: "Our AI technology helps you grasp complex concepts faster and retain information longer through interactive learning"
    },
    {
      icon: <Target className="h-5 w-5 text-rose-500" />,
      title: "Precision Learning",
      description: "Focus on exactly what you need to learn with AI-targeted content that adapts to your knowledge gaps"
    },
    {
      icon: <Trophy className="h-5 w-5 text-emerald-500" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics, performance metrics, and visual progress indicators"
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      title: "Time Efficiency",
      description: "Learn up to 3x faster with our optimized content delivery and spaced repetition technology"
    }
  ];

  const testimonials = [
    {
      author: {
        name: "Dr. Sarah Johnson",
        handle: "Neuroscience Researcher",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      },
      text: "QuizGen has revolutionized my approach to academic research. The AI-generated quizzes help me internalize complex scientific literature with unprecedented efficiency."
    },
    {
      author: {
        name: "Prof. Michael Chen",
        handle: "Computer Science Department Chair",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
      },
      text: "An indispensable resource for modern education. My students show 40% better retention rates when using QuizGen's interactive learning tools."
    },
    {
      author: {
        name: "Emily Rodriguez, MBA",
        handle: "Corporate Training Director",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
      },
      text: "The PDF analysis capability has transformed our corporate training programs. Our team processes complex documentation in half the time with double the comprehension."
    },
    {
      author: {
        name: "Dr. James Wilson",
        handle: "Medical Researcher",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james"
      },
      text: "The image analysis technology has been transformative for understanding complex medical imaging and diagrams. It's like having an expert tutor available 24/7."
    },
    {
      author: {
        name: "Lisa Zhang, Ed.D.",
        handle: "Educational Technology Specialist",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
      },
      text: "After implementing QuizGen across our curriculum, we've seen a 35% increase in student engagement and a significant improvement in standardized test scores."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-900 overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <PathsBackground className="opacity-5" />
      <Header />
      
      <main className="pt-24 pb-16">
        {showHistory ? (
          <Container>
            <div className="space-y-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <QuizHistory />
            </div>
          </Container>
        ) : (
          <>
            {/* Hero Section */}
            <Container className="relative text-center mb-32">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 space-y-8"
              >
                <motion.div 
                  variants={itemVariants} 
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-indigo-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 mr-2 text-indigo-600" />
                  <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Advanced AI-Powered Learning Platform</span>
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants} 
                  className="text-5xl md:text-7xl font-bold tracking-tight mb-8 mx-auto max-w-5xl leading-tight"
                >
                  <span className="relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 inline-block">
                      Transform Your Learning
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/0 via-purple-600 to-indigo-600/0 rounded-full"></div>
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 inline-block mt-2">
                    With Neural-Powered AI
                  </span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants} 
                  className="text-xl md:text-2xl font-medium text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  Experience the future of education with <span className="text-purple-600 font-semibold">QuizGen</span> — where advanced AI tailors interactive learning experiences to your unique cognitive style.
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col md:flex-row justify-center gap-6 items-center"
                >
                  <Button
                    onClick={() => navigate('/tools')}
                    className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Explore Our Platform</span>
                      <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/quiz-generator')}
                    className="group px-8 py-4 text-lg font-semibold border-2 border-indigo-200 text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Create First Quiz</span>
                    <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Button>
                </motion.div>
                
                {/* Feature badges */}
                <motion.div 
                  variants={containerVariants}
                  className="pt-16 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
                >
                  {["AI-Powered", "Real-time Feedback", "Personalized Learning", "Visual Analysis", "PDF Processing"].map((item, i) => (
                    <motion.span
                      key={i}
                      variants={itemVariants}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100 text-sm font-medium text-gray-700 shadow-sm flex items-center"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Enhanced decorative elements */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
                <div className="absolute top-1/4 -right-20 w-[40rem] h-[40rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-[40rem] h-[40rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 -z-20 grid grid-cols-12 grid-rows-6 gap-4">
                {Array.from({ length: 12 * 6 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-indigo-100/10 rounded-sm"></div>
                ))}
              </div>
            </Container>

            {/* Features Grid */}
            <Container className="mb-32">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="text-center mb-16"
              >
                <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 text-sm font-semibold mb-6 border border-purple-100">
                  <Layers className="h-4 w-4 mr-2 text-purple-600" />
                  Core Platform Features
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Next-Generation Tools for
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mt-1">
                    Knowledge Acquisition
                  </span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our neural-powered platform combines cutting-edge AI with intuitive design to create a learning experience that adapts to your unique cognitive style.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-purple-100/50 overflow-hidden"
                  >
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-purple-100/60 to-indigo-100/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                        <div className="text-purple-600 transform group-hover:scale-110 transition-transform duration-500">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="mt-6 inline-flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span>Learn more</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Container>

            {/* How It Works Section */}
            <Container className="mb-32">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="text-center mb-16">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm font-semibold mb-6 border border-indigo-100">
                    <PenTool className="h-4 w-4 mr-2 text-indigo-600" />
                    Simple Process
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    How QuizGen
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mt-1">
                      Transforms Your Learning
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Our intuitive three-step process makes it easy to leverage the power of neural AI for accelerated learning.
                  </p>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                >
                  {[
                    {
                      step: "01",
                      title: "Upload Content",
                      description: "Simply paste text or upload your PDF documents, presentations, or images to our platform.",
                      icon: <FileQuestion className="h-8 w-8 text-indigo-600" />
                    },
                    {
                      step: "02",
                      title: "AI Analysis",
                      description: "Our neural engine processes your content and generates personalized learning materials.",
                      icon: <Brain className="h-8 w-8 text-indigo-600" />
                    },
                    {
                      step: "03",
                      title: "Interactive Learning",
                      description: "Engage with AI-generated quizzes and get instant feedback on your understanding.",
                      icon: <Cpu className="h-8 w-8 text-indigo-600" />
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative p-8 rounded-2xl bg-white border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-500"
                    >
                      {/* Step connector line */}
                      {index < 2 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-indigo-100 z-10"></div>
                      )}
                      
                      {/* Step number */}
                      <div className="absolute -top-5 left-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xl font-bold py-2 px-4 rounded-xl shadow-lg">
                        {item.step}
                      </div>
                      
                      <div className="pt-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                          {item.icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Video or screenshot demonstration */}
                <motion.div
                  variants={itemVariants}
                  className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-indigo-100"
                >
                  <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50 p-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                    <div className="relative w-full max-w-4xl aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-indigo-600/90 flex items-center justify-center shadow-xl cursor-pointer hover:bg-indigo-700 transition-colors duration-300">
                        <div className="w-5 h-5 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-indigo-100">
                        <p className="text-indigo-800 font-medium">See how it works in 2 minutes</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Container>

            {/* Quiz Generator Section */}
            <Container className="mb-32">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-100/50 shadow-2xl hover:shadow-indigo-200/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">
                  <motion.div variants={itemVariants} className="space-y-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700">
                      <BookOpen className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">AI-Powered Quiz Creation</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-gray-900">
                      Transform Any Text into
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        Interactive Quizzes
                      </span>
                    </h2>
                    
                    <p className="text-xl text-gray-600">
                      Simply paste your text or upload content, and our AI will generate engaging quizzes tailored to your learning needs. Perfect for students, teachers, and self-learners.
                    </p>
                    
                    <ul className="space-y-4">
                      {[
                        {
                          icon: <Zap className="h-5 w-5 text-purple-600" />,
                          title: "Instant Generation",
                          description: "Create comprehensive quizzes in seconds"
                        },
                        {
                          icon: <Brain className="h-5 w-5 text-indigo-600" />,
                          title: "Smart Questions",
                          description: "AI generates relevant and challenging questions"
                        },
                        {
                          icon: <Target className="h-5 w-5 text-purple-600" />,
                          title: "Customizable Format",
                          description: "Multiple choice, true/false, and more"
                        }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button
                      size="lg"
                      onClick={() => navigate('/quiz-generator')}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Create Quiz Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    className="relative aspect-square w-full max-w-lg mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-3xl transform rotate-6 scale-95 opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-3xl transform -rotate-6 scale-95 opacity-30" />
                    <div className="relative h-full w-full bg-white rounded-3xl p-6 shadow-2xl">
                      <div className="absolute top-6 left-6 right-6 h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl" />
                      <div className="absolute bottom-6 left-6 right-6 h-32 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-4">
                        <div className="h-4 w-3/4 bg-purple-200/50 rounded mb-3" />
                        <div className="h-4 w-1/2 bg-purple-200/30 rounded" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>

            {/* PDF Assistant Section */}
            <Container className="mb-32">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-100/50 shadow-2xl hover:shadow-blue-200/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">
                  <motion.div variants={itemVariants} className="space-y-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700">
                      <FileQuestion className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Smart PDF Assistant</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-gray-900">
                      Get Instant Answers from
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Your PDF Documents
                      </span>
                    </h2>
                    
                    <p className="text-xl text-gray-600">
                      Upload your PDF documents and get immediate answers to any question. Our AI assistant makes studying and research efficient and interactive.
                    </p>
                    
                    <ul className="space-y-4">
                      {[
                        {
                          icon: <FileQuestion className="h-5 w-5 text-blue-600" />,
                          title: "Smart Document Analysis",
                          description: "AI understands and processes your PDFs instantly"
                        },
                        {
                          icon: <Brain className="h-5 w-5 text-indigo-600" />,
                          title: "Contextual Understanding",
                          description: "Get accurate answers based on document context"
                        },
                        {
                          icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
                          title: "Quick References",
                          description: "Find specific information in large documents"
                        }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button
                      size="lg"
                      onClick={() => navigate('/pdf-qa')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Try PDF Assistant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    className="relative aspect-square w-full max-w-lg mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl transform rotate-6 scale-95 opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl transform -rotate-6 scale-95 opacity-30" />
                    <div className="relative h-full w-full bg-white rounded-3xl p-6 shadow-2xl">
                      <div className="absolute top-6 left-6 right-6 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl" />
                      <div className="absolute bottom-6 left-6 right-6 h-32 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 p-4">
                        <div className="h-4 w-3/4 bg-blue-200/50 rounded mb-3" />
                        <div className="h-4 w-1/2 bg-blue-200/30 rounded" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>

            {/* Image Q&A Section */}
            <Container className="mb-32">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 border border-violet-100/50 shadow-2xl hover:shadow-violet-200/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">
                  <motion.div variants={itemVariants} className="space-y-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700">
                      <Image className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Visual Learning Made Easy</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-gray-900">
                      Understand Images with
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        AI-Powered Analysis
                      </span>
                    </h2>
                    
                    <p className="text-xl text-gray-600">
                      Upload any image - diagrams, charts, graphs, or visual content - and ask questions to get instant, accurate explanations powered by advanced AI.
                    </p>
                    
                    <ul className="space-y-4">
                      {[
                        {
                          icon: <Image className="h-5 w-5 text-emerald-600" />,
                          title: "Visual Content Analysis",
                          description: "Get detailed explanations of diagrams and charts"
                        },
                        {
                          icon: <Brain className="h-5 w-5 text-teal-600" />,
                          title: "Smart Understanding",
                          description: "AI interprets complex visual information"
                        },
                        {
                          icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
                          title: "Instant Answers",
                          description: "Quick responses to your visual queries"
                        }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button
                      size="lg"
                      onClick={() => navigate('/image-qa')}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Try Image Analysis
                      <Image className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    className="relative aspect-square w-full max-w-lg mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl transform rotate-6 scale-95 opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl transform -rotate-6 scale-95 opacity-30" />
                    <div className="relative h-full w-full bg-white rounded-3xl p-6 shadow-2xl">
                      <div className="absolute top-6 left-6 right-6 h-48 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl" />
                      <div className="absolute bottom-6 left-6 right-6 h-32 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 p-4">
                        <div className="h-4 w-3/4 bg-emerald-200/50 rounded mb-3" />
                        <div className="h-4 w-1/2 bg-emerald-200/30 rounded" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>

            {/* Benefits Section */}
            <Container className="mb-40">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="relative"
              >
                <motion.div variants={itemVariants} className="text-center mb-20">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-semibold mb-6 border border-purple-200/50">
                    <Star className="h-4 w-4 mr-2" />
                    Why Choose QuizGen
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    <span className="relative inline-block">
                      Accelerate Your Learning
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600/0 via-purple-600 to-purple-600/0 rounded-full"></div>
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mt-2">
                      With Neural Technology
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Our AI-powered platform adapts to your learning style and helps you achieve better results through personalized, data-driven approaches
                  </p>
                </motion.div>

                <motion.div 
                  variants={containerVariants} 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-indigo-500/5 blur-3xl -z-10" />
                  
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                      className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100/20"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-6 transform transition-transform duration-500 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-200 to-indigo-200 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-10 h-10 flex items-center justify-center relative z-10">
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                      
                      <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Stats section */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                  viewport={{ once: true }}
                  className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-10 border border-purple-100/50 shadow-lg"
                >
                  {[
                    { value: "93%", label: "Improved Learning Efficiency", icon: <Rocket className="h-6 w-6 text-purple-600" /> },
                    { value: "2.5×", label: "Faster Knowledge Retention", icon: <Zap className="h-6 w-6 text-indigo-600" /> },
                    { value: "86%", label: "Users Report Better Grades", icon: <Trophy className="h-6 w-6 text-purple-600" /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-md">
                        {stat.icon}
                      </div>
                      <h4 className="text-4xl font-bold text-gray-900">{stat.value}</h4>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </Container>

            {/* CTA Section */}
            <Container className="mb-40">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="relative rounded-3xl overflow-hidden"
              >
                {/* Background gradient and texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                
                {/* Animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-purple-600/30 animate-pulse"></div>
                
                {/* Decorative blobs and elements */}
                <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-500/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.1,
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 px-8 py-24 sm:py-32 text-center">
                  <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-10">
                    <span className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg">
                      <Rocket className="h-5 w-5 mr-2.5" />
                      <span className="text-base font-semibold">Start Your AI Learning Journey Today</span>
                    </span>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                      Revolutionize Your Learning Experience
                      <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">
                        With Neural-Powered Education
                      </span>
                    </h2>
                    
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                      Join thousands of professionals, students, and educators who are experiencing the future of personalized education with QuizGen's neural learning platform.
                    </p>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.2
                          }
                        }
                      }}
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                      >
                        <Button
                          onClick={() => navigate('/tools')}
                          className="group w-full sm:w-auto px-10 py-6 text-lg font-bold bg-white text-indigo-600 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25 flex items-center justify-center gap-3"
                        >
                          <span>Get Started Now</span>
                          <div className="relative w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-indigo-600 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                          </div>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => navigate('/tools')}
                          className="group w-full sm:w-auto px-8 py-6 text-lg font-bold border-2 border-white/20 text-white rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <span>Explore Tools</span>
                          <div className="relative w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                        </Button>
                      </motion.div>
                    </motion.div>
                    
                    {/* Trustpilot-style rating */}
                    <div className="flex flex-col items-center justify-center pt-10">
                      <div className="flex items-center space-x-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white/80 text-sm">Rated 4.9/5 based on 2,300+ reviews</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>

            {/* User Feedback Section */}
            <TestimonialsSection
              title="Loved by Learners Worldwide"
              description="Join thousands of satisfied users who have transformed their learning experience with QuizGen"
              testimonials={testimonials}
              className="mb-32"
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
