import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const GeminiChatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [showChat, setShowChat] = useState(false); // For animation

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Use environment variable for API key

  // Fetch user's name from Firestore on mount
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "");
        }
      }
    };
    fetchUserName();
  }, []);

  // Show welcome message when chat is opened
  useEffect(() => {
    if (visible) {
      setTimeout(() => setShowChat(true), 10);
      if (userName) {
        setMessages([
          {
            sender: "bot",
            text: `Hello ${userName}! 👋 How can I help you today?`,
          },
        ]);
      } else {
        setMessages([
          {
            sender: "bot",
            text: `Hello! 👋 How can I help you today?`,
          },
        ]);
      }
    } else {
      setShowChat(false);
    }
  }, [visible, userName]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await res.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not respond.";

      const botMessage = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button
        id="chatbot-toggle"
        onClick={() => setVisible(!visible)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#145A32", // Dark green
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 999,
          boxShadow: "0 4px 8px rgba(20,90,50,0.6)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E8449")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#145A32")}
        aria-label={visible ? "Close chat" : "Open chat"}
      >
        {visible ? "Close" : "Chat"}
      </button>

      {/* Chat container with smooth fade and slide animation */}
      <div
        id="chatbot-container"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "290px",     // Slightly bigger width
          height: "400px",    // Slightly bigger height
          backgroundColor: "#145A32", // Dark green background
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(20,90,50,0.7)",
          display: "flex",
          flexDirection: "column",
          zIndex: 998,
          opacity: showChat ? 1 : 0,
          transform: showChat ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents: showChat ? "auto" : "none",
          color: "#D5F5E3", // Light green text
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "14px",
            overflowY: "auto",
            fontSize: "15px",
            scrollbarWidth: "thin",
            scrollbarColor: "#1E8449 transparent",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "12px",
                color: msg.sender === "user" ? "#A9DFBF" : "#D5F5E3",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor:
                    msg.sender === "user" ? "#1E8449" : "#27AE60",
                  padding: "8px 14px",
                  borderRadius: "15px",
                  maxWidth: "80%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ fontStyle: "italic", color: "#A9DFBF" }}>
              Typing...
            </div>
          )}
        </div>
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid #1E8449",
            backgroundColor: "#196F3D",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me something..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "14px",
              backgroundColor: "#27AE60",
              color: "white",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default GeminiChatbot;
