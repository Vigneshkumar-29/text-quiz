import React from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  className?: string;
}

export function TestimonialCard({
  quote = "This quiz generator has transformed how I study. The questions are relevant and challenging!",
  author = "Sarah Johnson",
  role = "Student",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all",
        "border border-gray-100 hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg
            className="h-8 w-8 text-purple-500 mb-1"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-gray-600 italic">{quote}</p>
        </div>
        <div className="mt-auto flex items-center">
          <img
            className="h-10 w-10 rounded-full mr-3"
            src={avatarUrl}
            alt={author}
          />
          <div>
            <h4 className="font-medium text-gray-900">{author}</h4>
            {role && <p className="text-sm text-gray-500">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
