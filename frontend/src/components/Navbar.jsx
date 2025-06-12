import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import image1 from "../assets/image.jpg";

  const API_KEY = "AIzaSyB39IqC2w3zr9SIbAsf3AWyEwD9niQ93vU";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [translating, setTranslating] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    // Get saved language from localStorage or empty string
    return localStorage.getItem("selectedLang") || "";
  });

  const handleJoinNowClick = () => {
    navigate("/signup");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

 const translatePage = async (targetLang) => {
  if (!targetLang) return;

  setTranslating(true);

  try {
    const elements = document.querySelectorAll("body *:not(script):not(style)");
    const textNodes = [];
    const originalTexts = [];

    for (const el of elements) {
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textNodes.push(node);
          originalTexts.push(node.textContent.trim());
        }
      }
    }

    if (originalTexts.length === 0) return;

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: originalTexts,
          target: targetLang,
          format: "text",
        }),
      }
    );

    const data = await response.json();

    if (
      data?.data?.translations &&
      data.data.translations.length === textNodes.length
    ) {
      data.data.translations.forEach((translation, idx) => {
        textNodes[idx].textContent = translation.translatedText;
      });
    } else {
      console.warn("Mismatch in translation results");
    }
  } catch (error) {
    console.error("Translation error:", error);
    alert("Failed to translate page. Please try again.");
  }

  setTranslating(false);
};

  // When user selects a new language
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    localStorage.setItem("selectedLang", lang);
    1;
    translatePage(lang);  
  };

 
  return (
    <nav
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-6"
    >
      <img src={image1} alt="Logo" className="h-[50px] w-auto mb-4 md:mb-0" />

      <ul className="hidden md:flex flex-row items-center text-lg">
        <li
          id="home"
          className="ml-30 mr-5 cursor-pointer text-black-700 hover:text-green-900 transition"
        >
          Home
        </li>
        <li
          onClick={() => scrollToSection("pricing")}
          className="mx-5 cursor-pointer text-black-700 hover:text-green-900 transition"
        >
          Pricing
        </li>
        <li className="mx-5 cursor-pointer text-black-700 hover:text-green-900 transition">
          Features
        </li>
      </ul>

      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
        <button
          onClick={handleSignInClick}
          className="cursor-pointer bg-[#448269] text-white rounded-xl px-6 py-2 hover:bg-green-900 transition w-full md:w-auto"
        >
          Log In
        </button>
        <button
          onClick={handleJoinNowClick}
          className="cursor-pointer border border-green-700 text-green-700 bg-transparent px-6 py-2 rounded-xl hover:bg-green-100 transition w-full md:w-auto"
        >
          Join Now
        </button>

        {/* Language Selector Dropdown */}
        <label
          htmlFor="language-select"
          className="inline-block mx-2 text-green-900 font-medium whitespace-nowrap"
        >
          Translate Website:
        </label>

        <select
          id="language-select"
          className="w-full px-4 py-2 rounded-lg bg-green-800 border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleLanguageChange}
          disabled={translating}
          value={selectedLang}
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ar">Arabic</option>
          <option value="mr">Marathi</option>
          <option value="en">English</option>
        </select>

        {translating && (
          <p className="mt-2 text-green-300">Translating... Please wait.</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
