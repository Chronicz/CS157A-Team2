import React from "react";
import moment from "moment";
import Link from "next/link";

interface BlogListEntry {
  blog_id: number;
  blog_title: string;
  blog_date: Date;
  blog_description: string;
  blog_tag: string;
  blog_image_path: string;
  user_id: number;
  username: string;
}

interface BlogListEntryProps extends BlogListEntry {
  className?: string;
}

const BlogListEntry = ({ className, ...entryData }: BlogListEntryProps) => {
  const imagePath = entryData.blog_image_path.replace(
    "../frontend/cozyfirm/public",
    ""
  );
  return (
    <Link href={`/blogpost/${entryData.blog_id}`}>
      <div className={className}>
        <div className="flex flex-col items-center">
          <img
            src={imagePath}
            alt="Chair/Table"
            className="h-48 w-48 border-2 border-black mb-4"
          />
          <div className="flex flex-col">
            <p className="font-bold">{entryData.blog_title}</p>
            <div className="flex flex-row gap-3">
              <p className="font-semibold">By {entryData.username}</p>
              <p>{moment(entryData.blog_date).format("YYYY-MM-DD")}</p>
            </div>
            <div className="flex flex-row font-semibold">
              <div>Tag:</div>
              <div className="ml-4 border-2 rounded">{entryData.blog_tag}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BlogListEntry;
