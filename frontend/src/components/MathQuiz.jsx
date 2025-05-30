import React, { useState } from 'react';

const mathQuestions = [
  { id: 1, question: "What is 12 x 12?", options: ["A. 124", "B. 144", "C. 122", "D. 132"], correct_answer: "B. 144" },
  { id: 2, question: "What is the square root of 81?", options: ["A. 9", "B. 8", "C. 7", "D. 6"], correct_answer: "A. 9" },
  { id: 3, question: "What is 7 + 6?", options: ["A. 11", "B. 12", "C. 13", "D. 14"], correct_answer: "C. 13" },
  { id: 4, question: "What is 25% of 200?", options: ["A. 40", "B. 45", "C. 50", "D. 55"], correct_answer: "C. 50" },
  { id: 5, question: "Which number is a prime number?", options: ["A. 4", "B. 6", "C. 9", "D. 7"], correct_answer: "D. 7" },
  { id: 6, question: "What is 3 squared?", options: ["A. 6", "B. 9", "C. 12", "D. 3"], correct_answer: "B. 9" },
  { id: 7, question: "What is 100 divided by 5?", options: ["A. 15", "B. 25", "C. 20", "D. 10"], correct_answer: "C. 20" },
  { id: 8, question: "What is the value of π (pi) approximately?", options: ["A. 2.14", "B. 3.14", "C. 4.14", "D. 5.14"], correct_answer: "B. 3.14" },
  { id: 9, question: "What is 9 - 3?", options: ["A. 5", "B. 6", "C. 7", "D. 4"], correct_answer: "B. 6" },
  { id: 10, question: "What is the result of 5 x 5?", options: ["A. 10", "B. 20", "C. 25", "D. 15"], correct_answer: "C. 25" }
];

export default function MathQuiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQ = mathQuestions[current];

  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, selected]);
    setSelected(null);
    if (current + 1 < mathQuestions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getScore = () => answers.filter((a, i) => a === mathQuestions[i].correct_answer).length;

  if (!started) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-100 p-10 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Math Skills Quiz</h2>
        <p className="text-green-800 mb-6">Test your math skills and earn a certificate!</p>
        <button onClick={() => setStarted(true)} className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800">
          Start Quiz
        </button>
      </div>
    </div>
  );

  if (showResult) {
    const score = getScore();
    return (
      <div className="max-w-xl mx-auto text-center p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Quiz Completed!</h1>
        <p className="text-xl text-green-900 mb-2">Your Score: {score} / {mathQuestions.length}</p>
        <p className="text-green-600 italic">Well done!</p>
        <button onClick={() => window.print()} className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
          Download Certificate
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg bg-green-50 shadow-lg">
      <h2 className="text-xl text-green-900 font-bold mb-4">Question {current + 1} of {mathQuestions.length}</h2>
      <p className="mb-6 text-green-800 font-medium">{currentQ.question}</p>
      <ul className="space-y-4">
        {currentQ.options.map((opt, idx) => (
          <li key={idx}>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="form-radio text-green-700"
              />
              <span className="text-green-900">{opt}</span>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNext} className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
        {current + 1 === mathQuestions.length ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}