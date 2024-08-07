"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

interface BlogPostEntry {
  blog_id: number;
  blog_title: string;
  blog_date: Date;
  blog_description: string;
  blog_tag: string;
  blog_image_path: string;
  user_id: number;
  username: string;
}

const BlogPost = () => {
  const { blog_id } = useParams();

  const [blogPostData, setBlogPostData] = useState<BlogPostEntry>({
    blog_id: 0,
    blog_title: "her smile and her dreams",
    blog_date: new Date(),
    blog_description: "it gives me meaning everyday",
    blog_tag: "",
    blog_image_path: "",
    user_id: 0,
    username: "",
  });

  useEffect(() => {
    const fetchBlogPostData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/blogpost/${blog_id}`
        );
        const blogPostData = res.data[0];
        const imagePath = blogPostData.blog_image_path.replace(
          "../frontend/cozyfirm/public",
          ""
        );
        setBlogPostData({ ...blogPostData, blog_image_path: imagePath });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogPostData();
  }, [blog_id]);
  {
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <div className="w-3/4 flex flex-row justify-between items-center">
          <div className="flex justify-start">
            <Link href="/bloglist">
              <button className="text-lg font-normal cursor-pointer mr-4">
                &lt; Back
              </button>
            </Link>
          </div>
          <p className="flex justify-center text-3xl font-bold">
            {blogPostData.blog_title}
          </p>
          <div className="flex justify-end"></div>
        </div>
        <div className="flex flex-row gap-48 mt-12 mb-14">
          <p className="font-semibold">By {blogPostData.username}</p>
          <p>{moment(blogPostData.blog_date).format("YYYY-MM-DD")}</p>
        </div>
        <img
          src={blogPostData.blog_image_path}
          alt="Chair/Table"
          className="h-80 w-80 border-2 border-black mb-4"
        />
        <p className="ml-56 mr-56 mt-4 mb-4">{blogPostData.blog_description}</p>
      </div>
    </div>
  );
};

export default BlogPost;
