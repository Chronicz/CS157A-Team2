"use client";
import React, { useState } from "react";

interface createdBlogPostEntry {
  blog_id: number;
  blog_title: string;
  blog_date: Date;
  blog_description: string;
  blog_tag: string;
  blog_image_path: string;
  user_id: number;
}

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogTag, setBlogTag] = useState("");
  const [blogImagePath, setBlogImagePath] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const blogData = {
      blog_title: blogTitle,
      blog_date: blogDate,
      blog_description: blogDescription,
      blog_tag: blogTag,
      blog_image_path: blogImagePath,
      user_id: userId,
    };

    fetch("/createblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Blog post created successfully!");
      })
      .catch((error) => {
        setMessage("Error creating blog post!");
      });
  };

  return (
    <div>
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Blog Title:
          <input
            type="text"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Blog Date:
          <input
            type="date"
            value={blogDate}
            onChange={(event) => setBlogDate(event.target.value)}
          />
        </label>
        <br />
        <label>
          Blog Description:
          <textarea
            value={blogDescription}
            onChange={(event) => setBlogDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Blog Tag:
          <input
            type="text"
            value={blogTag}
            onChange={(event) => setBlogTag(event.target.value)}
          />
        </label>
        <br />
        <label>
          Blog Image Path:
          <input
            type="text"
            value={blogImagePath}
            onChange={(event) => setBlogImagePath(event.target.value)}
          />
        </label>
        <br />
        <label>
          User ID:
          <input
            type="number"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Create Blog Post" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateBlog;
