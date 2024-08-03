"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="relative h-full overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr
                key={user.user_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.first_name}</td>
                <td className="py-4 px-6">{user.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
