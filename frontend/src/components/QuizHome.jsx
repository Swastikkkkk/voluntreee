    import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ title, description, route }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-green-100 p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-green-200 transition"
      onClick={() => navigate(route)}
    >
      <h2 className="text-xl font-bold text-green-800 mb-2">{title}</h2>
      <p className="text-green-700">{description}</p>
    </div>
  );
};

export default function QuizHome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Choose a Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <QuizCard
          title="MySQL Quiz"
          description="Test your SQL skills and earn a certificate."
          route="/quiz/sql"
        />
        <QuizCard
          title="Geography Quiz"
          description="Explore the world and earn a certificate."
          route="/quiz/geography"
        />
        <QuizCard
          title="Math Quiz"
          description="Sharpen your math brain and earn a certificate."
          route="/quiz/math"
        />
      </div>
    </div>
  );
}
