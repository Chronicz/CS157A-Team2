"use client";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import SuccessPopup from "../../components/SuccessPopup";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogTag, setBlogTag] = useState("");
  const [blogImageFile, setBlogImageFile] = useState<File | undefined | null>(
    undefined
  );
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("Blog not added successfully!");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogImageFile) return;

    const postBlog = async () => {
      try {
        const blogData = new FormData();
        blogData.append("blog_title", blogTitle);
        blogData.append("blog_date", moment().format("YYYY-MM-DD"));
        blogData.append("blog_description", blogDescription);
        blogData.append("blog_tag", blogTag);
        blogData.append("blog_image_file", blogImageFile);
        blogData.append("user_id", userId.toString());

        const res = await axios.post(
          "http://localhost:8000/createblog",
          blogData
        );
        console.log(res.data);

        setMessage("Blog added successfully!");
        setShowSuccessPopup(true);
      } catch (error: any) {
        if (error.response) {
          setShowSuccessPopup(true);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    };
    postBlog();
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setBlogTitle("");
    setBlogDescription("");
    setBlogTag("");
    setBlogImageFile(null);
    setUserId("");
    console.log(blogImageFile);
  };

  return (
    <div className="w-3/4 mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-start">
          <Link href="/bloglist">
            <button className="text-lg font-normal cursor-pointer mr-4">
              &lt; Back
            </button>
          </Link>
        </div>
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          CREATE BLOG POST
        </h1>
        <div className="flex justify-end"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-4/5 mx-auto p-4 bg-white shadow-md rounded grid grid-cols-2 gap-6"
      >
        <div className="col-span-1 w-80 ">
          <div className="mb-2">
            <label
              htmlFor="blogTitle"
              className="block mb-1 text-sm text-gray-700"
            >
              Blog Title:
            </label>
            <input
              id="blogTitle"
              type="text"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
              className="w-80 p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="blogTag"
              className="block mb-1 text-sm text-gray-700"
            >
              Blog Tag:
            </label>
            <input
              id="blogTag"
              type="text"
              value={blogTag}
              onChange={(event) => setBlogTag(event.target.value)}
              className="w-80 p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="blogImageFile"
              className="block mb-1 text-sm text-gray-700"
            >
              Blog Image Upload:
            </label>
            <input
              id="blogImageFile"
              type="file"
              onChange={(event) => setBlogImageFile(event.target.files?.[0])}
              className="w-80 p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="userId"
              className="block mb-1 text-sm text-gray-700"
            >
              User ID:
            </label>
            <input
              id="userId"
              type="number"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="w-40 p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="mb-2 h-64">
            <label
              htmlFor="blogDescription"
              className="block mb-1 text-sm text-gray-700"
            >
              Blog Description:
            </label>
            <textarea
              id="blogDescription"
              value={blogDescription}
              onChange={(event) => setBlogDescription(event.target.value)}
              className="w-full h-full p-2 pl-3 text-sm text-gray-700 border border-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded col-span-2"
        >
          Create Blog Post
        </button>
      </form>
      {showSuccessPopup && (
        <SuccessPopup message={message} onClose={handleCloseSuccessPopup} />
      )}
    </div>
  );
};

export default CreateBlog;
