import React from "react";
import { useNavigate } from "react-router-dom";
const Herosection = () => {
  const navigate = useNavigate();
  const handleJoinNowClick = () => {
    navigate("/signup");
  };

  return (
    <section
      style={{ fontFamily: "'Merriweather', serif" }}
      className="flex flex-col items-center justify-center px-6 md:px-20 py-20 bg-white"
    >
      <h1 className="text-center text-[#448269] text-6xl  font-regular leading-tight">
        Where Helping Hands Meet
        <br className="text-6xl" />
        Real Needs.
      </h1>

      <p className="text-center text-gray-700 mt-6 text-base md:text-lg max-w-xl">
        Connect with verified NGOs, discover meaningful volunteering
        opportunities, and be the change you wish to see.
      </p>

      <button
        onClick={handleJoinNowClick}
        className=" cursor-pointer mt-8 bg-[#063F2E]  text-white text-lg font-medium rounded-xl px-8 py-3 hover:bg-green-800 transition duration-200"
      >
        Get Started
      </button>
    </section>
  );
};

export default Herosection;
