"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import moment from "moment";
import axios from "axios";
import SuccessPopup from "../../components/SuccessPopup";

function Register() {
  const [username, setUsername] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [message, setMessage] = useState("User not registered successfully");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reg = async () => {
      try {
        const userData = new FormData();
        userData.append("username", username);
        userData.append("password", password);
        userData.append("first_name", first_name);
        userData.append("last_name", last_name);

        const res = await axios.post(
          "http://localhost:8000/register",
          userData
        );
        console.log(res.data);
        setMessage("User registered successfully, please go to the login page");
        setShowSuccessPopup(true);
      } catch (error: any) {
        if (error.response) {
          setShowSuccessPopup(true);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    };
    reg();
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setUsername("");
    setPassword("");
    setFname("");
    setLname("");
  };
  return (
    <div className="w-3/4 h-full mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Register for an account</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-4/5 mx-auto p-4 bg-white shadow-md rounded flex flex-col items-center"
      >
        <div className="w-80 mb-4">
          <label
            htmlFor="username"
            className="block mb-1 text-sm text-gray-700"
          >
            Username:
          </label>
          <input
            id="username"
            type="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
          />
        </div>
        <div className="w-80 mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-700"
          >
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
        <div className="w-80 mb-4">
          <label
            htmlFor="first_name"
            className="block mb-1 text-sm text-gray-700"
          >
            First Name:
          </label>
          <input
            id="first_name"
            type="first_name"
            value={first_name}
            onChange={(event) => setFname(event.target.value)}
            className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
          />
        </div>
        <div className="w-80 mb-4">
          <label
            htmlFor="last_name"
            className="block mb-1 text-sm text-gray-700"
          >
            Last Name:
          </label>
          <input
            id="last_name"
            type="last_name"
            value={last_name}
            onChange={(event) => setLname(event.target.value)}
            className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
      {showSuccessPopup && (
        <SuccessPopup message={message} onClose={handleCloseSuccessPopup} />
      )}
    </div>
  );
}

export default Register;
