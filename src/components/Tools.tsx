"use client";

import React, { useState } from 'react';
import {
  BookOpen,
  FileQuestion,
  Brain,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Box,
  Search,
  Lock,
  Settings,
  History,
  BookMarked
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useNavigate } from 'react-router-dom';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  route: string;
  area: string;
  color: string;
  hoverColor: string;
}

export function Tools() {
  const navigate = useNavigate();

  const tools: Tool[] = [
    {
      id: 'quiz-generator',
      icon: <Box className="h-4 w-4" />,
      title: 'AI Quiz Generator',
      description: 'Transform any text into interactive quizzes with our advanced AI technology.',
      route: '/quiz-generator',
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
      color: "from-purple-600 to-indigo-600",
      hoverColor: "from-indigo-600 to-purple-600"
    },
    {
      id: 'pdf-assistant',
      icon: <FileQuestion className="h-4 w-4" />,
      title: 'PDF Assistant',
      description: 'Get instant answers from your PDF documents with AI-powered analysis.',
      route: '/pdf-qa',
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
      color: "from-blue-600 to-cyan-500",
      hoverColor: "from-cyan-500 to-blue-600"
    },
    {
      id: 'image-analysis',
      icon: <ImageIcon className="h-4 w-4" />,
      title: 'Image Analysis',
      description: 'Analyze and understand complex diagrams and visual content with AI assistance.',
      route: '/image-qa',
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
      color: "from-amber-500 to-rose-500",
      hoverColor: "from-rose-500 to-amber-500"
    },
    {
      id: 'blog',
      icon: <BookMarked className="h-4 w-4" />,
      title: 'Blog',
      description: 'Explore our educational blog with articles on AI, learning techniques, and more.',
      route: '/blog',
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
      color: "from-emerald-500 to-teal-500",
      hoverColor: "from-teal-500 to-emerald-500"
    },
    {
      id: 'chat-assistant',
      icon: <Sparkles className="h-4 w-4" />,
      title: 'AI Tutor (Coming Soon)',
      description: 'Get personalized explanations and learning assistance with our AI tutor.',
      route: '/chat',
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
      color: "from-violet-600 to-fuchsia-500",
      hoverColor: "from-fuchsia-500 to-violet-600"
    }
  ];

  const handleToolClick = (route: string, title: string) => {
    if (title.includes('Coming Soon')) {
      return; // Don't navigate for coming soon features
    }
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12">
      <Container>
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg border border-gray-200"
          >
            <ArrowRight className="h-4 w-4 transform rotate-180 text-gray-500 group-hover:text-indigo-600 transition-colors" />
            <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">Back to Home</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            AI-Powered Learning Tools
          </h1>
          
          <div className="w-[120px]"></div> {/* Spacer for alignment */}
        </div>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our suite of advanced tools designed to enhance your educational experience
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-5 xl:max-h-[34rem] xl:grid-rows-2">
            {tools.map((tool) => (
              <GridItem
                key={tool.id}
                area={tool.area}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => handleToolClick(tool.route, tool.title)}
                color={tool.color}
                hoverColor={tool.hoverColor}
              />
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  onClick: () => void;
  color: string;
  hoverColor: string;
}

const GridItem = ({ area, icon, title, description, onClick, color, hoverColor }: GridItemProps) => {
  const isDisabled = title.includes('Coming Soon');
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <li 
      className={cn("min-h-[14rem] list-none", area, isDisabled ? 'opacity-75' : 'cursor-pointer')}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-200 p-2 md:rounded-[1.5rem] md:p-3 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r rounded-[1.25rem] md:rounded-[1.5rem] transition-all duration-700",
          isHovered ? `${hoverColor} opacity-20 blur-xl scale-105` : `${color} opacity-0 blur-lg scale-100`
        )} />
        
        <GlowingEffect
          spread={70}
          glow={true}
          disabled={false}
          proximity={200}
          inactiveZone={0.01}
          borderWidth={3}
          movementDuration={1.2}
          variant="default"
          blur={3}
        />
        
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-gray-100 bg-white p-6 shadow-sm md:p-6 z-10 transition-transform duration-300 hover:translate-y-[-2px]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className={cn(
              "w-fit rounded-lg p-2.5 transition-all duration-500",
              isHovered ? `bg-gradient-to-r ${color} text-white rotate-3 scale-110` : "bg-purple-50 border-[0.75px] border-purple-100"
            )}>
              <div className={isHovered ? "text-white" : "text-purple-600"}>{icon}</div>
            </div>
            <div className="space-y-3">
              <h3 className={cn(
                "pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance transition-colors duration-300",
                isHovered ? "text-gray-900" : "text-gray-800"
              )}>
                {title}
              </h3>
              <h2 className={cn(
                "[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] transition-colors duration-300",
                isHovered ? "text-gray-700" : "text-gray-600"
              )}>
                {description}
              </h2>
            </div>
          </div>
          {!isDisabled && (
            <div className={cn(
              "flex justify-end items-center transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Tools; 