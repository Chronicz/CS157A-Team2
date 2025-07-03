"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

import SuccessPopup from "../../components/SuccessPopup";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    try {

      const res = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });

      console.log("Login successful:", res.data);

      // *** CRITICAL STEP: Store the JWT and User Info ***
      // This token will be sent with subsequent authenticated requests
      login(res.data.token, res.data.userId, res.data.username);

      setMessage("Logged in successfully! Redirecting to home...");
      // setShowSuccessPopup(true);

      router.push('/'); // Navigate to the root path

    } catch (error: any) {
      console.error("Login error:", error); // Log the full error for debugging

      // Handle different types of errors from the backend or network
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 400, 401, 409, 500)
        setMessage(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and http.ClientRequest in node.js
        setMessage("Network error: Could not connect to the server. Please try again later.");
      } else {
        // Something else happened in setting up the request that triggered an Error
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-3/4 h-full mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">LOGIN</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-4/5 mx-auto p-4 bg-white shadow-md rounded flex flex-col items-center"
      >
        {/* Display messages to the user */}
        {message && (
          <p className={`mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <div className="w-80 mb-4">
          <label htmlFor="username" className="block mb-1 text-sm text-gray-700">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
          />
        </div>
        <div className="w-80 mb-4">
          <label htmlFor="password" className="block mb-1 text-sm text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <div className="w-80 mb-4 my-4">
          Don't have an account yet?{" "}
          <Link href="/register">
            <button className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;