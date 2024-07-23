"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogListEntry from "../components/BlogListEntry";

const BlogList = () => {
  const [blogLists, setBlogLists] = useState<BlogListEntry[]>([]);

  useEffect(() => {
    const fetchBlogLists = async () => {
      try {
        const res = await axios.get("http://localhost:8000/bloglist");
        setBlogLists(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogLists();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-3xl font-bold">THE COZY BLOG</p>
        <p>Search for any blogs about a specific piece of furniture!</p>

        <div className="flex flex-row border-2 rounded">
          <div className="flex items-center w-full max-w-md mx-auto">
            <img src="/search_icon.jpg" alt="search" className="w-5 h-5 ml-2" />
            <input
              type="search"
              className="pl-2 w-full text-base text-gray-700"
              placeholder="Search..."
            />
            <button className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-4 gap-y-12 mt-10">
        {blogLists.map((blogList, index) => (
          <BlogListEntry key={index} {...blogList} className="basis-1/4" />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
