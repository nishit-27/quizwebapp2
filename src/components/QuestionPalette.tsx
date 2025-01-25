import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionPaletteProps {
  currentQuestion: number;
  answers: Record<number, string>;
  markedForReview: number[];
  onQuestionSelect: (questionId: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  currentQuestion,
  answers,
  markedForReview,
  onQuestionSelect,
  isCollapsed,
  onToggleCollapse
}) => {
  const sections = [
    { name: 'Physics', range: [1, 25] },
    { name: 'Chemistry', range: [26, 50] },
    { name: 'Mathematics', range: [51, 75] }
  ];

  const getQuestionStatus = (questionId: number) => {
    if (answers[questionId] && markedForReview.includes(questionId)) {
      return 'answered-marked';
    } else if (answers[questionId]) {
      return 'answered';
    } else if (markedForReview.includes(questionId)) {
      return 'marked';
    } else if (currentQuestion === questionId) {
      return 'not-answered';
    } else {
      return 'not-visited';
    }
  };

  const getStatusClasses = (status: string) => {
    const baseClasses = 'w-8 h-8 flex items-center justify-center text-sm font-medium border';
    
    const statusClasses = {
      'not-visited': 'bg-gray-100 text-gray-600 border-gray-300',
      'not-answered': 'bg-[#FF6B4A] text-white',
      'answered': 'bg-[#4CAF50] text-white',
      'marked': 'bg-[#673AB7] text-white',
      'answered-marked': 'bg-[#673AB7] text-white relative'
    };

    return `${baseClasses} ${statusClasses[status]}`;
  };

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-l-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="bg-white shadow-md w-80 flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Question Palette</h3>
        <button onClick={onToggleCollapse}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="p-4 border-b">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-100 border border-gray-300"></div>
            <span>Not Visited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#FF6B4A]"></div>
            <span>Not Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#4CAF50]"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#673AB7]"></div>
            <span>Marked for Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#673AB7] relative">
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#4CAF50] rounded-full"></div>
            </div>
            <span>Answered & Marked for Review</span>
          </div>
        </div>
      </div>

      {/* Questions Grid by Section */}
      <div className="flex-1 overflow-y-auto">
        {sections.map(({ name, range }) => (
          <div key={name} className="p-4 border-b">
            <h4 className="font-medium mb-3">{name}</h4>
            <div className="grid grid-cols-5 gap-2">
              {Array.from(
                { length: range[1] - range[0] + 1 },
                (_, i) => range[0] + i
              ).map((questionId) => {
                const status = getQuestionStatus(questionId);
                return (
                  <button
                    key={questionId}
                    onClick={() => onQuestionSelect(questionId)}
                    className={getStatusClasses(status)}
                  >
                    {questionId}
                    {status === 'answered-marked' && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;