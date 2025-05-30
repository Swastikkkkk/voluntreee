import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import image9 from "../assets/image9.png";
import image from "../assets/image.jpg";

const VolunteerSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // No default role; user must pick one
  const [checked, setChecked] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async () => {
    if (!name || !email || !password || !checked) {
      alert("Please fill in all fields and select your role.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: checked,
        uid: user.uid,
      });

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    if (!checked) {
      alert("Please select your role before signing up with Google.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "",
        email: user.email,
        role: checked,
        uid: user.uid,
      });

      alert("Google signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 relative">
        <img
          src={image9}
          alt="signup"
          className="h-screen w-screen object-fill"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center px-12">
        <div className="mb-4">
          <div className="flex items-center mb-6">
            <img src={image} alt="logo" className="h-10" />
          </div>

          <div className="bg-[#063F2E] text-white w-1/2 p-4 rounded-lg mb-6">
            <p className="text-l mb-2">
              "The smallest act of kindness is worth more than the grandest
              intention."
            </p>
            <p className="text-s">- Oscar Wilde</p>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />

          <div className="flex space-x-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="volunteer"
                checked={checked === "volunteer"}
                onChange={(e) => setChecked(e.target.value)}
                className="mr-2"
              />
              Volunteer
            </label>
            <label className="flex items-center ml-4">
              <input
                type="radio"
                value="ngo"
                checked={checked === "ngo"}
                onChange={(e) => setChecked(e.target.value)}
                className="mr-2"
              />
              As NGO
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-800 text-white py-2 rounded-xl hover:bg-green-900"
          >
            Sign Up
          </button>

          <button
            onClick={handleGoogleSignup}
            className={`w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 ${
              !checked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!checked}
          >
            Sign Up with Google
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account ?{" "}
            </span>
            <a href="/login" className="text-sm text-green-600 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignup;
