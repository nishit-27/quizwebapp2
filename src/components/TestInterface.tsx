import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import QuestionPanel from './QuestionPanel';
import QuestionPalette from './QuestionPalette';

interface TestInterfaceProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({ currentSection, onSectionChange }) => {
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleMarkForReview = (questionId: number) => {
    setMarkedForReview(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSaveAndNext = (questionId: number, answer: string | null) => {
    if (answer) {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    }
    // Move to next question, wrapping around to 1 if at question 75
    setCurrentQuestion(prev => prev === 75 ? 1 : prev + 1);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className={`flex-1 p-6 overflow-y-auto ${isPaletteCollapsed ? '' : 'mr-80'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => onSectionChange('physics')}
                className={`px-4 py-2 rounded ${
                  currentSection === 'physics' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Physics
              </button>
              <button
                onClick={() => onSectionChange('chemistry')}
                className={`px-4 py-2 rounded ${
                  currentSection === 'chemistry' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Chemistry
              </button>
              <button
                onClick={() => onSectionChange('maths')}
                className={`px-4 py-2 rounded ${
                  currentSection === 'maths' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Mathematics
              </button>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded">
              <Timer className="w-5 h-5 text-red-600" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <QuestionPanel
            questionId={currentQuestion}
            answer={answers[currentQuestion]}
            isMarkedForReview={markedForReview.includes(currentQuestion)}
            onAnswer={handleAnswer}
            onMarkForReview={handleMarkForReview}
            onSaveAndNext={handleSaveAndNext}
          />
        </div>
      </div>

      <div className="fixed right-0 top-[64px] bottom-0">
        <QuestionPalette
          currentQuestion={currentQuestion}
          answers={answers}
          markedForReview={markedForReview}
          onQuestionSelect={setCurrentQuestion}
          isCollapsed={isPaletteCollapsed}
          onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
        />
      </div>
    </div>
  );
};

export default TestInterface;