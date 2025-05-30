import React, { useState, useRef } from "react";

// Exactly 5 HR interview questions
const HR_QUESTIONS = [
  "Tell me about yourself.",
  "Why do you want to volunteer with us?",
  "What are your strengths and weaknesses?",
  "Describe a challenging situation you faced and how you handled it.",
  "How do you handle working in a team?"
];

const GEMINI_API_KEY = "AIzaSyBCBlWovL-76USdlu5IhR_iy1438BWaSlA"; // <-- replace this
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

const CommunicationTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState(Array(HR_QUESTIONS.length).fill(""));
  const [evaluations, setEvaluations] = useState(Array(HR_QUESTIONS.length).fill(null));
  const [submitting, setSubmitting] = useState(false);
  const recognitionRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }
    setTranscript("");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      setListening(false);
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentIndex] = transcript;
        return newAnswers;
      });
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentIndex] = transcript;
        return newAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (!transcript.trim()) {
      alert("Please answer the question before proceeding.");
      return;
    }
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = transcript;
      return newAnswers;
    });
    if (currentIndex < HR_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTranscript(answers[currentIndex + 1] || "");
    }
  };

  // Gemini evaluation
  const evaluateWithGemini = async (question, answer) => {
    const prompt = `
You are an HR interview evaluator. 
Here is the interview question: "${question}"
Here is the candidate's answer: "${answer}"
Evaluate the answer for clarity, relevance, communication skills, and completeness. 
Give a constructive feedback paragraph, and then give a score out of 10 as: "Score: X/10".
Respond in this format:
Feedback: <your feedback>
Score: X/10
    `;
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      // Gemini's response is in data.candidates[0].content.parts[0].text
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      // Parse feedback and score
      const feedbackMatch = text.match(/Feedback:(.*?)(Score:|$)/s);
      const scoreMatch = text.match(/Score:\s*([0-9]+)\/10/);
      return {
        feedback: feedbackMatch ? feedbackMatch[1].trim() : text,
        score: scoreMatch ? parseInt(scoreMatch[1], 10) : null
      };
    } catch (err) {
      return {
        feedback: "Could not evaluate (API/network error).",
        score: null
      };
    }
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      alert("Please answer the question before submitting.");
      return;
    }
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = transcript;
      return newAnswers;
    });

    setSubmitting(true);
    const evals = [];
    for (let i = 0; i < HR_QUESTIONS.length; i++) {
      evals.push(await evaluateWithGemini(HR_QUESTIONS[i], answers[i] || (i === currentIndex ? transcript : "")));
    }
    setEvaluations(evals);
    setSubmitting(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTranscript("");
    setAnswers(Array(HR_QUESTIONS.length).fill(""));
    setEvaluations(Array(HR_QUESTIONS.length).fill(null));
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Mock HR Interview (AI Evaluated)</h2>

        {evaluations.some(e => e) ? (
          <div className="w-full">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Your Results:</h3>
            {HR_QUESTIONS.map((q, i) => (
              <div key={i} className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-800">Q{i + 1}: {q}</div>
                <div className="mb-2 text-green-900">
                  <span className="font-semibold">Your Answer:</span> {answers[i]}
                </div>
                <div className="mb-1 text-green-800">
                  <span className="font-semibold">Feedback:</span> {evaluations[i]?.feedback}
                </div>
                <div className="text-blue-700 font-bold">
                  {evaluations[i]?.score !== null ? `Score: ${evaluations[i].score}/10` : ""}
                </div>
              </div>
            ))}
            <button
              onClick={handleRestart}
              className="mt-4 px-6 py-3 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition font-semibold"
            >
              Restart Test
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-green-900 text-lg font-semibold">
              Answer this question aloud:
            </div>
            <div className="mb-6 p-4 bg-green-100 rounded-lg text-green-800 font-bold text-center">
              "{HR_QUESTIONS[currentIndex]}"
            </div>
            <div className="mb-6 w-full">
              <textarea
                className="w-full h-32 p-3 border border-green-200 rounded-lg text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={transcript}
                placeholder="Your answer will appear here..."
                readOnly
              />
            </div>
            <div className="flex gap-4">
              {!listening ? (
                <button
                  onClick={startListening}
                  className="px-8 py-3 bg-green-700 text-white text-lg rounded-lg shadow hover:bg-green-800 transition font-semibold"
                >
                  Start Answering
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="px-8 py-3 bg-red-500 text-white text-lg rounded-lg shadow hover:bg-red-600 transition font-semibold"
                >
                  Stop
                </button>
              )}

              {currentIndex < HR_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gray-300 text-green-900 text-lg rounded-lg shadow hover:bg-gray-400 transition font-semibold"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 transition font-semibold ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {submitting ? "Evaluating..." : "Submit"}
                </button>
              )}
            </div>
            <div className="mt-4 text-green-700 text-sm">
              {listening && "Listening..."}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunicationTest;
