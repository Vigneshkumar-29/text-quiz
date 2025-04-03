# QuizGen - Interactive Learning Platform

QuizGen is a modern web application that combines quiz generation and PDF document analysis capabilities to create an engaging learning experience.

## Features

### Quiz Generation
- Create custom quizzes from any text content
- Interactive quiz interface with real-time feedback
- Score tracking and performance analytics
- Progress visualization
- Quiz history and results storage

### PDF Question & Answer
- Upload and analyze PDF documents
- Ask questions about PDF content in natural language
- Real-time AI-powered responses using Claude 3 Opus
- Interactive chat interface
- Support for large PDF documents
- Progress tracking during PDF processing

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS
- **Animation**: Framer Motion
- **PDF Processing**: PDF.js
- **AI Integration**: OpenRouter API with Claude 3 Opus
- **Authentication**: Firebase Auth
- **State Management**: React Context

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quizgen.git
cd quizgen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Usage

### Quiz Generation
1. Navigate to "Create Quiz"
2. Enter your text content
3. Configure quiz settings
4. Generate and take the quiz
5. View your results and track progress

### PDF Q&A
1. Navigate to "PDF Q&A"
2. Upload a PDF document
3. Wait for processing to complete
4. Ask questions about the document
5. Receive AI-powered answers in real-time

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenRouter for AI capabilities
- PDF.js for PDF processing
- Tailwind CSS for styling
- Framer Motion for animations
- Firebase for authentication
- All contributors and supporters

## Support

For support, email support@quizgen.com or open an issue in the repository.
