"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ProductEntry {
  furniture_id: number;
  furniture_name: string;
  brand: string;
  description: string;
  furniture_image_path: string;
  furniture_buy_link: string;
  length: number;
  width: number;
  height: number;
  material: string;
  color: string;
}

const BlogPost = () => {
  const { furniture_id } = useParams();

  const [furnitureInfo, setFurnitureInfo] = useState<ProductEntry>({
    furniture_id: 0,
    furniture_name: "",
    brand: "",
    description: "",
    furniture_image_path: "",
    furniture_buy_link: "",
    length: 0,
    width: 0,
    height: 0,
    material: "",
    color: "",
  });

  useEffect(() => {
    const fetchFurnitureInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/furnitureinfo/${furniture_id}`
        );
        const furnitureData = res.data[0];
        setFurnitureInfo(furnitureData);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFurnitureInfo();
  }, [furniture_id]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <div className="w-3/4 flex flex-row justify-between items-center">
          <div className="flex justify-start">
            <Link href="/browse">
              <button className="text-lg font-normal cursor-pointer mr-4">
                &lt; Back
              </button>
            </Link>
          </div>
          <p className="flex justify-center text-3xl font-bold">
            {furnitureInfo.furniture_name}
          </p>
          <div className="flex justify-end"></div>
        </div>
        <div className="flex flex-row gap-12 mt-28 mb-14">
          <div className="w-1/2 ml-64">
            <img
              src={furnitureInfo.furniture_image_path}
              alt="Chair/Table"
              className="h-80 w-80 border-2 border-black mb-4"
            />
          </div>
          <div className="w-1/2 pl-8 mr-20">
            <p className="">Brand: {furnitureInfo.brand}</p>
            <p className="mt-4">{furnitureInfo.description}</p>
            <p className="mt-4">
              Buy Now:{" "}
              <a href={furnitureInfo.furniture_buy_link} target="_blank">
                {furnitureInfo.furniture_buy_link}
              </a>
            </p>
            <p className="mt-4">
              Dimensions: {furnitureInfo.length}in x {furnitureInfo.width}in x{" "}
              {furnitureInfo.height}in
            </p>
            <p className="mt-4">Material: {furnitureInfo.material}</p>
            <p className="mt-4">Color: {furnitureInfo.color}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
