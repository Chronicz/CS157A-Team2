"use client";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogTag, setBlogTag] = useState("");
  const [blogImageFile, setBlogImageFile] = useState<File>();
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogImageFile) return;

    const postBlog = async () => {
      try {
        const blogData = new FormData();
        blogData.set("blog_title", blogTitle);
        blogData.set("blog_date", moment().format("YYYY-MM-DD"));
        blogData.set("blog_description", blogDescription);
        blogData.set("blog_tag", blogTag);
        blogData.set("blog_image_file", blogImageFile);
        blogData.set("user_id", userId.toString());

        console.log(blogData.get("blog_title"));
        console.log(blogData.get("blog_date"));
        console.log(blogData.get("blog_description"));
        console.log(blogData.get("blog_tag"));
        console.log(blogData.get("blog_image_file"));
        console.log(blogData.get("user_id"));

        // const res = await axios.post(
        //   "http://localhost:8000/createblog",
        //   blogData
        // );
        // console.log(res.data);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    };
    postBlog();
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">CREATE BLOG POST</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded grid grid-cols-2 gap-4"
      >
        <div className="col-span-1">
          <label className="block mb-2">
            Blog Title:
            <input
              type="text"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
              className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </label>
          <label className="block mb-2">
            Blog Tag:
            <input
              type="text"
              value={blogTag}
              onChange={(event) => setBlogTag(event.target.value)}
              className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </label>
          <label className="block mb-2">
            Blog Image Upload:
            <input
              type="file"
              onChange={(event) => setBlogImageFile(event.target.files?.[0])}
              className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </label>
          <label className="block mb-2">
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="w-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </label>
        </div>
        <div className="col-span-1">
          <label className="block mb-2">
            Blog Description:
            <textarea
              value={blogDescription}
              onChange={(event) => setBlogDescription(event.target.value)}
              className="w-full h-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded col-span-2"
        >
          Create Blog Post
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default CreateBlog;
