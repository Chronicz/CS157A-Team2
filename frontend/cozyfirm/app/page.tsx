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
      <h1 className="flexBetween padding-container relative z-30 py-5 ">Build your Cozy Corner</h1>
    </div>
  )
}

export default Home