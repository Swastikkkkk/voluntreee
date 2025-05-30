import React, { useState } from "react";

const questions = [
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Strong Question Language",
      "Simple Query Language",
      "Structured Question Language",
    ],
    answer: 0,
  },
  {
    question: "Which SQL statement is used to retrieve data from a database?",
    options: ["GET", "SELECT", "EXTRACT", "OPEN"],
    answer: 1,
  },
  {
    question: "Which command is used to remove all records from a table?",
    options: ["REMOVE", "DELETE", "TRUNCATE", "DROP"],
    answer: 2,
  },
  {
    question: "Which of the following is a DDL command?",
    options: ["INSERT", "UPDATE", "CREATE", "SELECT"],
    answer: 2,
  },
  {
    question: "What is a primary key?",
    options: [
      "A unique identifier for a table row",
      "A field that can be left blank",
      "A field that stores images",
      "A field that holds duplicate values",
    ],
    answer: 0,
  },
  {
    question: "Which SQL clause is used to filter results?",
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
    answer: 0,
  },
  {
    question: "What does the JOIN operation do?",
    options: [
      "Combines rows from two or more tables",
      "Deletes rows from a table",
      "Updates a table",
      "Creates a new table",
    ],
    answer: 0,
  },
  {
    question: "Which function returns the number of rows in a table?",
    options: ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"],
    answer: 1,
  },
  {
    question: "Which SQL keyword is used to sort the result-set?",
    options: ["ORDER BY", "SORT", "GROUP BY", "ALIGN BY"],
    answer: 0,
  },
  {
    question: "Which command is used to add a new column to an existing table?",
    options: [
      "ALTER TABLE ... ADD",
      "UPDATE TABLE ... ADD",
      "MODIFY TABLE ... ADD",
      "INSERT INTO ... ADD",
    ],
    answer: 0,
  },
];

export default function VolunteerQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (idx) => setSelected(idx);

  const handleNext = () => {
    if (selected === questions[current].answer) setScore(score + 1);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult)
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Quiz Completed!</h1>
          <p className="text-xl text-green-900 mb-2">
            Your Score: {score} / {questions.length}
          </p>
          <p className="text-green-600 italic">Well done!</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Try Again
          </button>
          <button
            onClick={() => window.print()}
            className="mt-4 ml-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Download Certificate
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-green-800 mb-4">MySQL Quiz</h1>
        <p className="mb-2 text-green-700 font-semibold">
          Question {current + 1} of {questions.length}
        </p>
        <p className="mb-6 text-green-900 font-medium">{questions[current].question}</p>
        <ul className="space-y-4 mb-6">
          {questions[current].options.map((opt, idx) => (
            <li key={idx}>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="option"
                  value={idx}
                  checked={selected === idx}
                  onChange={() => handleOption(idx)}
                  className="form-radio text-green-700"
                />
                <span className="text-green-900">{opt}</span>
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50"
        >
          {current + 1 === questions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
