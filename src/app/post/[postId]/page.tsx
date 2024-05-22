"use client";

import api from "@/lib/axios";
import Post from "@/components/Post";
import ReplyOfPost from "@/components/ReplyOfPost";

import { Reply } from "prisma/prisma-client";

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
      <Post {...post.data} refetch={post.refetch} />
      {post.data.replys.map((reply: Reply) => (
        <ReplyOfPost {...reply} />
      ))}
    </div>
  );
};
