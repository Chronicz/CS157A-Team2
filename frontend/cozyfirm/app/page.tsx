"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/buttons";
import Login from "./Login";
import User from "./user";

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
    <div>
      <Login></Login>
      <User></User>
    </div>
  );
};

export default Home;
