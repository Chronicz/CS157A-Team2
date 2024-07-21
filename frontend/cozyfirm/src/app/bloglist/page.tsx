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
      <div className="grid grid-cols-3 gap-2 justify-center h-screen">
        {blogLists.map((blogList, index) => (
          <BlogListEntry key={index} {...blogList} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
