import React, { useState } from 'react';

const geoQuestions = [
  { id: 1, question: "What is the capital of France?", options: ["A. Berlin", "B. Rome", "C. Paris", "D. Madrid"], correct_answer: "C. Paris" },
  { id: 2, question: "Which is the largest continent?", options: ["A. Africa", "B. Europe", "C. Asia", "D. Antarctica"], correct_answer: "C. Asia" },
  { id: 3, question: "Mount Everest is located in?", options: ["A. Nepal", "B. China", "C. India", "D. Pakistan"], correct_answer: "A. Nepal" },
  { id: 4, question: "Which ocean is the largest?", options: ["A. Atlantic", "B. Arctic", "C. Pacific", "D. Indian"], correct_answer: "C. Pacific" },
  { id: 5, question: "What is the longest river in the world?", options: ["A. Amazon", "B. Nile", "C. Yangtze", "D. Mississippi"], correct_answer: "B. Nile" },
  { id: 6, question: "Which country has the most population?", options: ["A. India", "B. USA", "C. China", "D. Indonesia"], correct_answer: "C. China" },
  { id: 7, question: "Which desert is the largest in the world?", options: ["A. Gobi", "B. Sahara", "C. Arabian", "D. Kalahari"], correct_answer: "B. Sahara" },
  { id: 8, question: "What is the capital of Australia?", options: ["A. Sydney", "B. Melbourne", "C. Brisbane", "D. Canberra"], correct_answer: "D. Canberra" },
  { id: 9, question: "Which of these is a landlocked country?", options: ["A. Brazil", "B. Afghanistan", "C. Italy", "D. Japan"], correct_answer: "B. Afghanistan" },
  { id: 10, question: "Which country is known as the Land of the Rising Sun?", options: ["A. India", "B. China", "C. Japan", "D. Korea"], correct_answer: "C. Japan" }
];

export default function GeographyQuiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQ = geoQuestions[current];

  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, selected]);
    setSelected(null);
    if (current + 1 < geoQuestions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getScore = () => answers.filter((a, i) => a === geoQuestions[i].correct_answer).length;

  if (!started) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-100 p-10 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Geography Explorer Quiz</h2>
        <p className="text-green-800 mb-6">Explore the world and earn a certificate!</p>
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
        <p className="text-xl text-green-900 mb-2">Your Score: {score} / {geoQuestions.length}</p>
        <p className="text-green-600 italic">Well done!</p>
        <button onClick={() => window.print()} className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
          Download Certificate
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg bg-green-50 shadow-lg">
      <h2 className="text-xl text-green-900 font-bold mb-4">Question {current + 1} of {geoQuestions.length}</h2>
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
        {current + 1 === geoQuestions.length ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}