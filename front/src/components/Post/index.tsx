import React from "react";
import CreatePostCard from "./CreatePostCard";
import PostList from "./List";

const Post: React.FC = () => {
  return (
    <div className="flex flex-col w-full pt-10 px-8 bg-scale-50">
      <CreatePostCard />
      <PostList />
    </div>
  );
};

export default Post;
