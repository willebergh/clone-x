"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import api from "@/lib/axios";

import { useQuery, useMutation } from "@tanstack/react-query";

import Post from "@/components/Post";

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

  if (posts.isLoading) {
    return "loading";
  }

  if (posts.error) return "error";

  return (
    <div>
      <div>
        {posts.data.map((post) => (
          <Post {...post} />
        ))}
      </div>
    </div>
  );
}
