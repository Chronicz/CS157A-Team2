"use client";

import React from "react";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import BlogListEntry from "../../components/BlogListEntry";
import Link from "next/link";

interface iDefault {
  defaultValue: string | null;
}

const BlogList = ({ defaultValue }: iDefault) => {
  const router = useRouter();
  const [inputValue, setValue] = useState(defaultValue);
  const [blogLists, setBlogLists] = useState<BlogListEntry[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  const handleSearch = () => {
    if (inputValue) {
      axios
        .get("http://localhost:8000/bloglist", {
          params: { blog_title: inputValue },
        })
        .then((res) => {
          setBlogLists(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      // If the search input is empty, fetch all the blogs
      axios
        .get("http://localhost:8000/bloglist")
        .then((res) => setBlogLists(res.data))
        .catch((err) => console.log(err));
    }
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

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
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            value={inputValue ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Search something..."
          />
        </div>
        <button
          type="button"
          title="Create a post"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300 ease-in-out"
        >
          <Link href="/createblog">Create Blog Post</Link>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-y-14 mt-10">
        {blogLists.map((blogList, index) => (
          <BlogListEntry key={index} {...blogList} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
