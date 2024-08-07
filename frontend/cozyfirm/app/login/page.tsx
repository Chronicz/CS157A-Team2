"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: { preventDefault: () => void }) {
    axios
      .post("http://localhost:8000/login", { username, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="p-3 bg-white w-25">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              placeholder="Enter username"
              className="form-control mx-4"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control mx-4"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
