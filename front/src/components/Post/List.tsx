import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAxios } from "../../utils/hooks";
import { Post, rSetPosts } from "../../utils/redux/postSlice";
import { usePosts } from "../../utils/redux/selector";
import { getApiUrl, getAxiosHeaders } from "../../utils/services/api";
import PostCard from "./PostCard";

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [allowFetch, setAllowFetch] = useState(false);
  const postsLimit = 3;
  const [pagination, setPagination] = useState({
    hasMore: true,
    offset: 0,
  });

  const posts = usePosts();

  const { data, isLoading, fetchData } = useAxios<{}, Post[]>({
    allowFetch,
    url: getApiUrl(`posts?offset=${pagination.offset}&limit=${postsLimit}`),
    method: "get",
    ...getAxiosHeaders(),
  });

  useEffect(() => {
    fetchData();

    const scrollElement = ref.current;
    if (scrollElement) scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollElement)
        scrollElement.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newPosts = data || [];
    dispatch(rSetPosts([...posts, ...newPosts]));
    setPagination((pagination) => ({
      hasMore: newPosts.length === postsLimit,
      offset: pagination.offset + newPosts.length,
    }));
    setAllowFetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleScroll = () => {
    const element = ref.current;
    if (element) {
      const { scrollHeight, scrollTop, clientHeight } = element;
      const isScrollToBottom =
        Math.round(scrollHeight - scrollTop) === clientHeight;
      if (isScrollToBottom && !isLoading && pagination.hasMore) {
        setAllowFetch(true);
      }
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center pt-10 mt-1 overflow-y-scroll overflow-x-hidden h-full"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
