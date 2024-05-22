"use client";

import moment from "moment";
import { useState, useEffect } from "react";
import CreatePost from "@/components/CreatePost";
import PageTitle from "@/components/PageTitle";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const CreatePage = () => {
  const [time, setTime] = useState("");
  const { data, status } = useSession();

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    });
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [status, data]);

  return (
    <div>
      <PageTitle content="New Post" />
      <div className="p-4">
        <CreatePost />
      </div>
    </div>
  );
};

export default CreatePage;
