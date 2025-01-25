import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/e/eb/National_Testing_Agency_logo.png" 
            alt="NTA Logo"
            className="h-12"
          />
          <div className="border-l border-gray-300 h-12"></div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Government of India"
            className="h-12"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
          </select>
          
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Candidate Name</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;