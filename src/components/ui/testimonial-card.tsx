import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl",
        "bg-white dark:bg-gray-800/90 shadow-lg",
        "p-6 text-start",
        "hover:shadow-xl",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        "border border-gray-100 dark:border-gray-700",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-gray-900 dark:text-white">
            {author.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-md leading-relaxed">
        {text}
      </p>
    </Card>
  )
}
