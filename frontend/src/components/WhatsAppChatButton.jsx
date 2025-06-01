import React from "react";

const adminPhone = "919971872399"; // Replace with your admin's number (country code, no +)

export default function WhatsAppChatButton() {
  return (
    <a
      href={`https://wa.me/${adminPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Admin on WhatsApp"
      className="fixed z-50 bottom-6 right-6 group"
    >
      <span className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-200 group-hover:scale-110">
        {/* WhatsApp SVG */}
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.601.845 5.02 2.293 7.013L4 29l7.18-2.263A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917a10.92 10.92 0 01-5.565-1.527l-.398-.237-4.262 1.345 1.376-4.154-.26-.426A10.92 10.92 0 015.083 15c0-6.033 4.884-10.917 10.917-10.917S26.917 8.967 26.917 15 22.033 25.917 16 25.917zm5.842-8.354c-.32-.16-1.89-.934-2.182-1.04-.293-.107-.507-.16-.72.16-.214.32-.827 1.04-1.014 1.253-.187.213-.374.24-.694.08-.32-.16-1.352-.498-2.578-1.59-.953-.85-1.597-1.897-1.785-2.217-.187-.32-.02-.493.14-.653.144-.143.32-.374.48-.56.16-.187.213-.32.32-.534.107-.214.053-.4-.027-.56-.08-.16-.72-1.736-.987-2.377-.26-.624-.524-.54-.72-.547-.187-.007-.4-.009-.613-.009-.214 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.143 3.093 1.303 3.307.16.213 2.25 3.44 5.453 4.688.763.293 1.357.467 1.822.597.765.205 1.46.176 2.012.107.614-.08 1.89-.77 2.157-1.515.267-.746.267-1.386.187-1.515-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </span>
      <span className="absolute right-20 bottom-1/2 translate-y-1/2 bg-white text-green-700 rounded-lg px-3 py-1 text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
        Chat with Admin
      </span>
    </a>
  );
}
