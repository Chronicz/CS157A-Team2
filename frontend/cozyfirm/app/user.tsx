"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/buttons";
import login from "./Login";

interface User {
  user_id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

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
    <tbody>
      {users.map((user: User) => (
        <tr key={user.user_id} className="my-44">
          <div>
            <p className="text-black mx-16 font-bold text-lg">
              Hello, {user.first_name}!
            </p>
            <div className="my-16">
              <div className="grid-container grid grid-cols-3 mx-96 border-2 p-2 border-black text-black text-lg">
                <div className="grid-item mx-4 font-bold">Username</div>
                <div className="grid-item mx-4"></div>
                <div className="grid-item mx-4"></div>
                <div className="grid-item mx-4">{user.username}</div>
                <div className="grid-item mx-4"></div>
                <div className="grid-item mx-4"></div>
                <div className="grid-item mx-4 my-4"></div>
                <div className="grid-item mx-4 my-4"></div>
                <div className="grid-item mx-4 my-4"></div>
                <div className="grid-item mx-4 font-bold">First Name</div>
                <div className="grid-item mx-4 font-bold">Last Name</div>
                <div className="grid-item mx-4 font-bold">Password</div>
                <div className="grid-item mx-4">{user.first_name}</div>
                <div className="grid-item mx-4">{user.last_name}</div>
                <div className="grid-item mx-4">{user.password}</div>
              </div>
              <div className="flex row-wrap flex-end mx-96">
                <div className="my-2">
                  <Button
                    type="button"
                    title="Account Settings"
                    variant="btn_dark_green"
                  />
                </div>
                <div className="p-2">
                  <Button
                    type="button"
                    title="Wishlist"
                    variant="btn_dark_green"
                  ></Button>
                </div>
                <div className="my-2">
                  <Button
                    type="button"
                    title="My Blogs"
                    variant="btn_dark_green"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </tr>
      ))}
    </tbody>
  );
};

export default Home;
