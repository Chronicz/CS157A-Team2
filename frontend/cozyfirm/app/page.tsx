"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Furniture {
  furniture_id: number;
  furniture_name: string;
  brand: string;
  description: string;
  length: number;
  height: number;
  width: number;
  price: number;
  material: string;
  color: string;
}

const Home = () => {
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    const fetchFurnitures = async () => {
      try {
        const res = await axios.get("http://localhost:8000");
        setFurnitures(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFurnitures();
  }, []);

  return (
    <div>
      <div className="bold-40 py-20">
        Build your Cozy Corner
      </div>

    </div>

  );
};

export default Home;
