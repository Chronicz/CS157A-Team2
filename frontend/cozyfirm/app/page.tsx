"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import buttons from "../components/buttons";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000");
        setUsers(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="my-44">
      <h1 className="text-black text-3xl text-center">Account</h1>
      <div>
        <p className="text-black mx-16 font-bold text-lg">Hello (username)!</p>
        <div className="my-16">
          <div className="grid-container grid grid-cols-3 mx-96 border-2 p-2 border-black text-black text-lg">
            <div className="grid-item mx-4 font-bold">Username</div>
            <div className="grid-item mx-4"></div>
            <div className="grid-item mx-4"></div>
            <div className="grid-item mx-4">a username</div>
            <div className="grid-item mx-4"></div>
            <div className="grid-item mx-4"></div>
            <div className="grid-item mx-4 my-4"></div>
            <div className="grid-item mx-4 my-4"></div>
            <div className="grid-item mx-4 my-4"></div>
            <div className="grid-item mx-4 font-bold">First Name</div>
            <div className="grid-item mx-4 font-bold">Last Name</div>
            <div className="grid-item mx-4 font-bold">Password</div>
            <div className="grid-item mx-4">a first name</div>
            <div className="grid-item mx-4">a last name</div>
            <div className="grid-item mx-4">a password</div>
          </div>
          <div className="flex row-wrap flex-end mx-96">
            <div className="my-2">
              <buttons type="button" title="Account Settings"></buttons>
            </div>
            <div className="p-2">
              <button type="button" title="Wishlist"></button>
            </div>
            <div className="my-2">
              <button type="button" title="My Blogs"></button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
