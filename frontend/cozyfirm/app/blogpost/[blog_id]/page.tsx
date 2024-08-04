"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "next/navigation";

interface BlogPost {
  blog_id: number;
  blog_title: string;
  blog_date: Date;
  blog_description: string;
  blog_tag: string;
  user_id: number;
  username: string;
}

const BlogPost = () => {
  const { blog_id } = useParams();

  const [blogPostData, setBlogPostData] = useState<BlogPost>({
    blog_id: 0,
    blog_title: "",
    blog_date: new Date(),
    blog_description: "",
    blog_tag: "",
    user_id: 0,
    username: "",
  });

  useEffect(() => {
    const fetchBlogPostData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/blogpost/${blog_id}`
        );
        setBlogPostData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);

        alert("Error fetching blog post data");
      }
    };
    fetchBlogPostData();
  }, [blog_id]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">{blogPostData.blog_title}</p>
          <div className="flex flex-row gap-48 mt-12 mb-14">
            <p className="font-semibold">By {blogPostData.username}</p>
            <p>{moment(blogPostData.blog_date).format("YYYY-MM-DD")}</p>
          </div>
          <img
            src="/chair.png"
            alt="Chair"
            className="h-80 w-80 border-2 border-black mb-4"
          />
        </div>
      </div>
      <p>{blogPostData.blog_description}</p>
    </div>
  );
};

export default BlogPost;
