# QuizGen - Article to Quiz Generator

## What is QuizGen?

QuizGen is an innovative educational platform that leverages artificial intelligence to transform any text content into engaging multiple-choice quizzes. Built with React, TypeScript, and Supabase, it provides an intuitive interface for generating, taking, and tracking quizzes. Whether you're a student studying for exams, a teacher creating assessments, or a content creator looking to engage your audience, QuizGen offers a powerful solution for interactive learning.

## How to Use QuizGen

1. **Create an Account**: Register with your email or sign in if you already have an account
2. **Generate a Quiz**: Navigate to the Quiz Generator page and either:
   - Upload a text file (currently supporting .txt format)
   - Paste your article or study material directly
3. **Customize Your Quiz**: Select the number of questions you want (3, 5, 7, or 10)
4. **Take the Quiz**: Answer questions one by one with immediate feedback
5. **Review Results**: See your score, time spent, and correct/incorrect answers
6. **Track Progress**: Visit your Quiz History to monitor improvement over time
7. **Export Options**: Download quizzes as text files or printable PDFs for offline study

## Benefits of QuizGen

- **Time-Saving**: Automatically generate relevant questions from any text in seconds
- **Personalized Learning**: Create custom quizzes tailored to specific topics or materials
- **Immediate Feedback**: Receive instant results with visual indicators for correct/incorrect answers
- **Engagement**: Interactive elements like confetti animations make learning more enjoyable
- **Progress Tracking**: Monitor performance metrics to identify areas for improvement
- **Accessibility**: Access your quizzes and history from any device with an internet connection
- **Privacy-Focused**: Secure authentication ensures your quiz data remains private

## Advantages of QuizGen

- **AI-Powered Intelligence**: Uses advanced natural language processing to create meaningful questions
- **User-Friendly Interface**: Clean, intuitive design requires no technical expertise
- **Flexible Content Sources**: Works with any text content across various subjects and difficulty levels
- **Educational Analytics**: Gain insights into learning patterns and knowledge retention
- **Offline Capability**: Export quizzes for use without internet access
- **Scalable Learning**: Suitable for individual study sessions or classroom implementation
- **Cost-Effective**: Eliminates the need for expensive quiz-creation software or services

## Features

- **AI-Powered Quiz Generation**: Upload text files or paste content to generate custom quizzes
- **Interactive Quiz Interface**: Take quizzes with immediate feedback and visual cues
- **User Authentication**: Secure login and registration system
- **Quiz History**: Track your quiz performance over time
- **Export Options**: Download quizzes as text or PDF for offline use
- **Responsive Design**: Works seamlessly across devices
- **Customizable Quiz Length**: Choose from 3, 5, 7, or 10 questions per quiz
- **Visual Progress Tracking**: See your progress through each quiz
- **Celebratory Animations**: Enjoy confetti effects for correct answers
- **Comprehensive Results**: Detailed breakdown of performance after each quiz

## Use Cases

- **Students**: Create practice tests from textbooks, notes, or online resources
- **Teachers**: Generate assessments from lesson materials to test comprehension
- **Content Creators**: Convert articles into interactive quizzes for audience engagement
- **Self-Learners**: Test knowledge retention when studying new subjects
- **Training Programs**: Develop quick assessments from training materials
- **Book Clubs**: Create discussion questions from book chapters
- **Language Learners**: Test comprehension of texts in foreign languages

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

## Future Enhancements

- Support for additional file formats (PDF, DOCX, etc.)
- Custom quiz templates and themes
- Social sharing capabilities
- Integration with learning management systems
- Mobile application development
- Advanced analytics and learning insights
- Team/classroom management features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the component library
- OpenRouter for the AI text processing capabilities
- Supabase for the backend infrastructure
