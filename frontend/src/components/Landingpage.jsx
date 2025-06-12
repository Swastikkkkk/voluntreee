import React from "react";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import ImagesSection from "./ImageSection";
import PricingSection from "./PricingSection.jsx";
import Footer from "./Footer.jsx";
import GeminiChatbot from "./GeminiChatbot.jsx";

import FrontlineWorker from "./FrontlineWorker";

const Landingpage = ({ simplified }) => {
  return (
    <>
      <Navbar />

      {simplified && (
        <div style={{ backgroundColor: '#ffeeba', padding: '10px', textAlign: 'center' }}>
          ⚠️ Slow Internet Detected. You're viewing a simplified version.
        </div>
      )}

      {simplified && <FrontlineWorker />}

      {!simplified && (
        <>
          <Herosection />
          <ImagesSection />
          <GeminiChatbot />
        
          <PricingSection />
        </>
      )}

      <Footer />
    </>
  );
};

export default Landingpage;
