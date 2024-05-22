"use client";

import moment from "moment";
import { useState, useEffect } from "react";
import CreatePost from "@/components/CreatePost";
import PageTitle from "@/components/PageTitle";

export default () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    });
  }, []);

  return (
    <div>
      <PageTitle content="New Post" />
      <div className="p-4">
        <CreatePost />
      </div>
    </div>
  );
};
