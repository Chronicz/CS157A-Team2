"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    signIn("credentials", { username: user.username, password: user.password });
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
        <button
          type="submit"
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
