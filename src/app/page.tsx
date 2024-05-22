"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import api from "@/lib/axios";

import { Post as PostType } from "prisma/prisma-client";

import { useQuery, useMutation } from "@tanstack/react-query";

import Post from "@/components/Post";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  const { data, status } = useSession();

  const posts = useQuery({
    queryKey: ["post"],
    queryFn: () => api.getPosts(),
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  return (
    <>
      <PageTitle content="Home" />

      {posts.isLoading && "Loading"}

      {posts.isSuccess &&
        posts.data.map((post: any) => (
          <Post key={post.id} refetch={posts.refetch} {...post} />
        ))}
    </>
  );
}
