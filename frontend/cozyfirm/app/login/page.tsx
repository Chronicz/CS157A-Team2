"use client";
import React, { useState } from "react";
import axios from "axios"; // Keep axios, it's needed now!
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

// Assuming you have a SuccessPopup component for messages
// import SuccessPopup from "../../components/SuccessPopup"; // Uncomment if you have this

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or error messages
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Use React.FormEvent for type safety
    e.preventDefault(); // Prevent default form submission (page reload)
    setMessage(""); // Clear previous messages

    // Basic client-side validation (ensure fields are not empty)
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return; // Stop the function if validation fails
    }

    try {
      // Make the POST request to your backend login API
      // Ensure this URL matches your backend route (e.g., /api/login or /login)
      const res = await axios.post("http://localhost:8000/login", {
        username, // Shorthand for username: username
        password, // Shorthand for password: password
      });

      // Log the response data from the backend
      console.log("Login successful:", res.data);

      // *** CRITICAL STEP: Store the JWT and User Info ***
      // This token will be sent with subsequent authenticated requests
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('username', res.data.username);

      // Set success message for popup
      setMessage("Logged in successfully! Redirecting to home...");
      // You can optionally show a popup here, then redirect
      // setShowSuccessPopup(true); // If using a popup

      // Redirect to the home page or a dashboard after successful login
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
            type="text" // Correct HTML type
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