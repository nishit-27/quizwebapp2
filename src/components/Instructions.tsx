"use client";

import { useState } from "react";
import QuetionWindow from "./QuetionWindow";


export default function Instructions() {
  const [isChecked, setIsChecked] = useState(false);

  const [change, setchange] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked); // Use the event's checked value
  };

  const handleProceed = () => {
    if (isChecked) {
      setchange((prev) => !prev);
    } else {
      alert("Please agree to the instructions before proceeding.");
    }
  };

  if (!change) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-4xl p-6 space-y-6 bg-white rounded-lg shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Instructions</h1>
            <p className="text-gray-500">
              Please read the instructions carefully
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>General Instructions:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Total duration of the examination is 180 minutes.</li>
              <li>
                The countdown timer in the top right corner will display the
                remaining time. When the timer reaches zero, the examination
                will end automatically.
              </li>
              <li>
                The Questions Palette displayed on the right side of the screen
                shows the status of each question using various symbols.
              </li>
              <li>
                You can click on the arrow to collapse the question palette and
                maximize the question window. Use to expand it again.
              </li>
              <li>
                Click on your "Profile" image in the top right corner to change
                the language during the exam.
              </li>
              <li>
                Use navigation arrows (↑ and ↓) to quickly jump to the top or
                bottom of the question area.
              </li>
            </ul>

            <p>
              <strong>Navigating to a Question:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Click on the question number in the Question Palette to go to
                that question directly.
              </li>
              <li>
                Use "Save & Next" to save your answer and move to the next
                question.
              </li>
              <li>
                Use "Mark for Review & Next" to save your answer, mark it for
                review, and proceed.
              </li>
            </ul>

            <p>
              <strong>Answering a Question:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Click the button of the desired option to select your answer.
              </li>
              <li>
                Click the same button again or "Clear Response" to deselect it.
              </li>
              <li>
                Use "Save & Next" to save your answer and "Mark for Review &
                Next" to save and mark it for review.
              </li>
            </ul>

            <p>
              <strong>Navigating Through Sections:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Sections are displayed on the top bar. Click a section name to
                view its questions.
              </li>
              <li>
                You can shuffle between sections and questions anytime during
                the exam.
              </li>
              <li>
                After the last question of a section, you'll automatically be
                taken to the next section.
              </li>
            </ul>

            <p>
              By proceeding, you agree to adhere to the examination rules and
              instructions.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="agreement"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange} // Use event to handle checkbox state
              className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="agreement"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I have read and understood the instructions.
            </label>
          </div>

          <button
            onClick={handleProceed}
            className={`w-full px-4 py-2 text-white rounded-md ${
              isChecked
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isChecked} // Button only enabled when checkbox is checked
          >
            Proceed
          </button>
        </div>
      </div>
    );
  } else {
    return <QuetionWindow />;
  }
}
