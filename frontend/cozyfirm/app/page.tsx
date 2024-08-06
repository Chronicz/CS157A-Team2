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
      <div className="relative h-full overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">Furnitures</th>
              <th className="py-3 px-6">Brand</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Material</th>
              <th className="py-3 px-6">Color</th>
              <th className="py-3 px-6">Price</th>
            </tr>
          </thead>
          <tbody>
            {furnitures.map((furn: Furniture) => (
              <tr
                key={furn.furniture_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">{furn.furniture_name}</td>
                <td className="py-4 px-6">{furn.brand}</td>
                <td className="py-4 px-6">{furn.description}</td>
                <td className="py-4 px-6">{furn.material}</td>
                <td className="py-4 px-6">{furn.color}</td>
                <td className="py-4 px-6">{furn.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
