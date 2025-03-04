# QuizGen - Article to Quiz Generator

QuizGen is an interactive web application that transforms any text content into engaging multiple-choice quizzes. Built with React, TypeScript, and Supabase, it provides an intuitive interface for generating, taking, and tracking quizzes.

## Features

- **AI-Powered Quiz Generation**: Upload text files or paste content to generate custom quizzes
- **Interactive Quiz Interface**: Take quizzes with immediate feedback and visual cues
- **User Authentication**: Secure login and registration system
- **Quiz History**: Track your quiz performance over time
- **Export Options**: Download quizzes as text or PDF for offline use
- **Responsive Design**: Works seamlessly across devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Authentication, Database)
- **AI Integration**: OpenRouter API for quiz generation
- **UI Components**: Shadcn UI library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- OpenRouter API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/quizgen.git
   cd quizgen
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. Start the development server
   ```
   npm run dev
   ```

## Database Setup

Run the following SQL in your Supabase SQL editor to set up the necessary tables:

```sql
-- Create quiz_attempts table
CREATE TABLE quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  score INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  article_title TEXT,
  questions JSONB
);

-- Enable row level security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own quiz attempts" 
  ON quiz_attempts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts" 
  ON quiz_attempts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quiz attempts" 
  ON quiz_attempts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_attempts;
```

## Usage

1. Register or log in to your account
2. Navigate to the Quiz Generator page
3. Upload a text file or paste content
4. Select the number of questions
5. Click "Generate Quiz" to create your quiz
6. Answer the questions and receive immediate feedback
7. View your quiz history and performance analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the component library
- OpenRouter for the AI text processing capabilities
- Supabase for the backend infrastructure
