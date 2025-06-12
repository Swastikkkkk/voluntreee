import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useSlowConnection from "./components/useSlowConnection";

import Landingpage from "./components/Landingpage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import VolunteerHome from "./components/VolunteerHome";
import NGOHome from "./components/NGOHome";
import VolunteerQuiz from "./components/VolunteerQuiz";
import GeographyQuiz from "./components/GeographyQuiz";
import MathQuiz from "./components/MathQuiz";
import VolunteerProfile from "./components/VolunteerProfile";
import QuizHome from "./components/QuizHome";
import VolunteerDashboard from "./components/VolunteerDashboard";
import Communication from "./components/Communication";
import VolunteerOpportunitiesWrapper from "./components/VolunteerOpportunitiesWrapper";

const App = () => {
  const isSlow = useSlowConnection();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage simplified={isSlow} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/volunteer-home" element={<VolunteerHome />} />
        <Route path="/ngo-home" element={<NGOHome />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/quiz/sql" element={<VolunteerQuiz />} />
        <Route path="/quiz/geography" element={<GeographyQuiz />} />
        <Route path="/quiz/math" element={<MathQuiz />} />
        <Route path="/volunteer/profile/:id" element={<VolunteerProfile />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/communication-test" element={<Communication />} />
        <Route path="/opportunities" element={<VolunteerOpportunitiesWrapper />} />  
      </Routes>
    </Router>
  );
};

export default App;
