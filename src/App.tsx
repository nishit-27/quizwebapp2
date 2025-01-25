import React, { useState } from 'react';
import { Timer, User, BookOpen, CheckCircle, Circle, HelpCircle, RotateCcw, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import TestInterface from './components/TestInterface';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

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

function App() {
  const [currentSection, setCurrentSection] = useState('physics');
  const [language, setLanguage] = useState('english');
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);

  const handleTestComplete = (result: TestResult) => {
    setLastTestResult({
      ...result,
      testDate: new Date(),
    });
    setIsTestCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={setLanguage} />
      {isTestCompleted ? (
        <Dashboard lastTestResult={lastTestResult} />
      ) : (
        <TestInterface 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          onTestComplete={handleTestComplete}
        />
      )}
    </div>
  );
}

export default App;