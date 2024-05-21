"use client";

import moment from "moment";
import { useState, useEffect } from "react";
import CreatePost from "@/components/CreatePost";

export default () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    });
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold p-4">New Post</h1>
        <h1 className="text-xl font-bold p-4">{time}</h1>
      </div>
      <CreatePost />
    </div>
  );
};
