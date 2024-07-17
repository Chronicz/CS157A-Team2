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
      <h1>3 Tier Setup Testing</h1>
      <div className="users">
        {users.map(user => (
          <div className="user" key={user.UID}>
            {user.UID}
            <br />
            {user.LastName}
            <br />
            {user.FirstName}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home