"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import CreatePost from "@/components/CreatePost";

export default function Home() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  return <div>Hello</div>;
}
