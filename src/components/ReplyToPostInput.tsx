"use client";

import api from "@/lib/axios";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ChangeEventHandler, FormEventHandler } from "react";

export default ({
  postId,
  refetch,
}: {
  postId: string;
  refetch: () => void;
}) => {
  const maxCount = 140;
  const [content, setContent] = useState("");

  const replyToPost = useMutation({
    mutationFn: () => api.replyToPost(postId, content),
    onSuccess: refetch,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    replyToPost.mutate();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const newText = e.target.value;
    if (newText.length <= maxCount) {
      setContent(newText);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center border-b border-black"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full p-2 resize-none focus:outline-none focus:ring-0"
        placeholder="Got you thinking whaaat..."
        value={content}
        onChange={handleChange}
      />
      <div className=" flex flex-row w-full content-center items-center">
        <span className="grow py-2 px-4">
          {content.length} / {maxCount}
        </span>
        <button className="py-2 px-4 bg-black text-white" type="submit">
          Reply
        </button>
      </div>
    </form>
  );
};
