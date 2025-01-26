"use client";

import { useState } from "react";
import Instructions from "./Instructions";

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginProps) {
  const [applicationId, setApplicationId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate basic validation
    if (applicationId && dateOfBirth) {
      setShowInstructions(true); // Show instructions page
    } else {
      setError("Please enter both Application ID and Date of Birth");
    }
  };

  // If instructions should be shown, render the Instructions component
  if (showInstructions) {
    return <Instructions onProceed={() => onLogin(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Exam Portal Login
          </h1>
          <p className="text-gray-500">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="applicationId"
              className="block text-sm font-medium text-gray-700"
            >
              Application ID
            </label>
            <input
              id="applicationId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your application ID"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
