"use client";

import api from "@/lib/axios";
import Post from "@/components/Post";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default () => {
  const params = useParams();
  const post = useQuery({
    queryKey: ["post", params?.postId],
    queryFn: () => api.getPost(params?.postId as string),
  });

  if (post.isLoading) {
    return "loading";
  }

  if (post.error) {
    return "error";
  }

  return (
    <div>
      <Post {...post.data} />
    </div>
  );
};
