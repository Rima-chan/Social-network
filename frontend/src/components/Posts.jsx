import React from "react";
import CreatePostCard from "./CreatePostCard";

const Posts = () => {
  return (
    <div className="flex-grow grid grid-cols-4">
      <div className="col-span-3 flex flex-col items-center p-5">
        <CreatePostCard />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Posts;
