import React from "react";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import ImagesSection from "./ImageSection";
import PricingSection from "./PricingSection.jsx";
import Footer from "./Footer.jsx";
import GeminiChatbot from "./GeminiChatbot.jsx";
import PhotoUploader from "./PhotoUploader.jsx";



const Landingpage = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <ImagesSection />
      <GeminiChatbot />
      <PhotoUploader />
      <PricingSection />
      <Footer />
     
      
      
    </>
  );
};

export default Landingpage;
