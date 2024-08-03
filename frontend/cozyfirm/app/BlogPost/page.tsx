import React from "react";
import moment from "moment";

interface BlogPost {
  blog_id: number;
  blog_title: string;
  blog_date: Date;
  blog_description: string;
  blog_tag: string;
  user_id: number;
  username: string;
}

interface BlogPostProps extends BlogPost {
  className?: string;
}

const BlogPost = ({ className, ...entryData }: BlogPostProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">The Best-Valued Steelcase Chair</p>
          <div className="flex flex-row gap-48 mt-12 mb-14">
            <p className="font-semibold">By Keanu Bicol</p>
            <p>{moment(entryData.blog_date).format("YYYY-MM-DD")}</p>
          </div>
          <img
            src="/chair.png"
            alt="Chair"
            className="h-80 w-80 border-2 border-black mb-4"
          />
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quos
        mollitia quidem sapiente voluptatum molestias assumenda, ut nihil
        similique explicabo nam quam debitis blanditiis fugiat saepe,
        perferendis ipsum suscipit? Minus. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eum quos mollitia quidem sapiente
        voluptatum molestias assumenda, ut nihil similique explicabo nam quam
        debitis blanditiis fugiat saepe, perferendis ipsum suscipit? Minus.
      </p>
    </div>
  );
};
export default BlogPost;
