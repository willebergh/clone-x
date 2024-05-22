"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { ChangeEventHandler, FormEventHandler } from "react";

import api from "@/lib/axios";

export default () => {
  const router = useRouter();

  const maxCount = 140;
  const [content, setContent] = useState("");

  const createPost = useMutation({
    mutationFn: () => api.createPost(content),
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createPost.mutate();
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    const newText = e.target.value;
    if (newText.length <= maxCount) {
      setContent(newText);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center border border-black"
      onSubmit={handleSubmit}
    >
      <textarea
        rows={5}
        className="w-full p-2 resize-none focus:outline-none focus:ring-0"
        placeholder="Whats on your mind..."
        value={content}
        onChange={handleChange}
      />
      <div className=" flex flex-row w-full content-center items-center">
        <span className="grow py-2 px-4">
          {content.length} / {maxCount}
        </span>
        <button className="py-2 px-4 bg-black text-white" type="submit">
          Post
        </button>
      </div>
    </form>
  );
};
