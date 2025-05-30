import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import image9 from "../assets/image9.png";
import image from "../assets/image.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === "ngo") {
          navigate("/ngo-home");
        } else if (role === "volunteer") {
          navigate("/volunteer-home");
        } else {
          alert("Unknown role. Please contact admin.");
        }
      } else {
        alert("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 relative">
        <img src={image9} alt="woo" className="h-screen w-screen object-fill" />
      </div>
      <div className="w-1/2 flex flex-col justify-center px-12">
        <div className="mb-4">
          <div className="flex items-center mb-6">
            <img src={image} alt="logo" className="h-10 " />
          </div>

          <div className=" bg-[#063F2E] text-white w-1/2 p-4 rounded-xl mb-6">
            <p className="text-l mb-2">
              "The smallest act of kindness is worth more than the grandest
              intention."
            </p>
            <p className="text-s">-Oscar Wilde</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full px-3 py-2 border border-gray-300 rounded-xl"
          />

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="w-1/2 bg-green-800 text-white py-2 px-4 rounded-xl hover:bg-green-900"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
