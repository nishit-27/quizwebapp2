import React, { useState } from 'react';
import { Timer, User, BookOpen, CheckCircle, Circle, HelpCircle, RotateCcw, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import TestInterface from './components/TestInterface';
import Header from './components/Header';

function App() {
  const [currentSection, setCurrentSection] = useState('physics');
  const [language, setLanguage] = useState('english');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={setLanguage} />
      <TestInterface 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
    </div>
  );
}

export default App;