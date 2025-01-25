import React, { useState } from 'react';
import { Timer, CheckCircle, XCircle, Clock, HelpCircle, ChevronDown, ChevronUp, Circle } from 'lucide-react';

interface TestResult {
  score: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  questionTimes: Record<number, number>;
  answers?: Record<number, string>;
  correctAnswers?: Record<number, string>;
  testDate: Date;
}

interface DashboardProps {
  lastTestResult: TestResult | null;
}

const Dashboard: React.FC<DashboardProps> = ({ lastTestResult }) => {
  const [showTimeDetails, setShowTimeDetails] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!lastTestResult) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
          <p className="text-gray-600">No test attempts yet.</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const totalTime = Object.values(lastTestResult.questionTimes).reduce((sum, time) => sum + time, 0);

  // Calculate section-wise time
  const sectionTimes = {
    Physics: 0,
    Chemistry: 0,
    Mathematics: 0,
  };

  Object.entries(lastTestResult.questionTimes).forEach(([questionNum, time]) => {
    const qNum = parseInt(questionNum);
    if (qNum >= 1 && qNum <= 25) {
      sectionTimes.Physics += time;
    } else if (qNum >= 26 && qNum <= 50) {
      sectionTimes.Chemistry += time;
    } else if (qNum >= 51 && qNum <= 75) {
      sectionTimes.Mathematics += time;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Test Analysis</h1>
            <p className="text-sm text-gray-500">Taken on: {lastTestResult.testDate.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{lastTestResult.score}/300</div>
            <div className="text-sm text-gray-500">Total Score</div>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Correct</p>
                <p className="text-2xl font-bold text-green-600">{lastTestResult.correct}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-75" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+4 marks each</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Incorrect</p>
                <p className="text-2xl font-bold text-red-600">{lastTestResult.incorrect}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500 opacity-75" />
            </div>
            <p className="text-xs text-gray-500 mt-2">-1 mark each</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unattempted</p>
                <p className="text-2xl font-bold text-gray-600">{lastTestResult.unattempted}</p>
              </div>
              <Circle className="w-8 h-8 text-gray-500 opacity-75" />
            </div>
            <p className="text-xs text-gray-500 mt-2">0 marks</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-blue-600">{formatTime(totalTime)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500 opacity-75" />
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Question Analysis</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Physics', 'Chemistry', 'Mathematics'].map((section, sectionIndex) => (
                <div key={section} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">{section}</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }, (_, i) => {
                      const questionNum = sectionIndex * 25 + i + 1;
                      const answer = lastTestResult.answers?.[questionNum];
                      const isCorrect = answer === lastTestResult.correctAnswers?.[questionNum];
                      
                      return (
                        <div
                          key={questionNum}
                          className={`
                            relative p-2 rounded-md text-center cursor-pointer
                            hover:ring-2 hover:ring-blue-300 transition-all
                            ${
                              answer
                                ? isCorrect
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                                : 'bg-gray-200 text-gray-600'
                            }
                          `}
                          title={`Time taken: ${formatTime(lastTestResult.questionTimes[questionNum] || 0)}`}
                        >
                          {questionNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Analysis */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Time Analysis</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Section Times */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(sectionTimes).map(([section, time]) => (
                <div key={section} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">{section}</h4>
                  <p className="text-xl font-bold text-gray-800 mt-1">{formatTime(time)}</p>
                </div>
              ))}
            </div>

            {/* Question Times */}
            <div>
              <button
                onClick={() => setShowTimeDetails(!showTimeDetails)}
                className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-700">Question-wise Time Details</span>
                {showTimeDetails ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {showTimeDetails && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Physics', 'Chemistry', 'Mathematics'].map((section, sectionIndex) => (
                    <div key={section} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-3">{section}</h4>
                      <div className="space-y-2">
                        {Array.from({ length: 25 }, (_, i) => {
                          const questionNum = sectionIndex * 25 + i + 1;
                          const time = lastTestResult.questionTimes[questionNum] || 0;
                          return (
                            <div key={questionNum} className="flex justify-between text-sm">
                              <span className="text-gray-600">Q{questionNum}</span>
                              <span className="font-mono">{formatTime(time)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 