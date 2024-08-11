"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flexCenter bold-40 pt-20 flex-col">
        <div className="flexCenter flex-col py-0 my-0">
          <Image
            src="/logo.png"
            width={500}
            height={500}
            alt="Logo"
          />
          <Link href="/browse" passHref className="absolute bottom-56">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bold-20">Browse</button>
          </Link>
        </div>


      </div>

    </div>

  );
};

export default Home;
