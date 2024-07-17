"use client";

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000")
        setUsers(res.data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h1 className="font-bold text-3xl">3 Tier Setup Testing</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">SJSU_ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Major</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.SJSU_ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{user.SJSU_ID}</td>
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home