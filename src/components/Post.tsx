import Link from "next/link";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import { User, Like, Reply } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ReplyToPostInput from "@/components/ReplyToPostInput";

import api from "@/lib/axios";

export default ({
  id,
  created_at,
  content,
  user,
  requesterHasLiked,
  numberOfReplys,
  likes = [],
  replys = [],
  refetch,
}: {
  id: string;
  created_at: string;
  content: string;
  requesterHasLiked?: boolean;
  numberOfReplys?: number;
  user: User;
  likes: Like[];
  replys: Reply[];
  refetch: () => void;
}) => {
  const router = useRouter();

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const likePost = useMutation({
    mutationKey: ["post", id],
    mutationFn: () => api.likePost(id),
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <div className="border-b border-black p-4 flex flex-col gap-4">
        <div className="flex flex-row gap-4  items-center">
          <img className="w-12" src={user.image || ""} />
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex flex-row justify-between">
              <Link className="font-bold" href={"/users/" + user.id}>
                {user.name}
              </Link>

              <span>{moment(created_at).fromNow()}</span>
            </div>

            <div style={{ wordBreak: "break-word" }}>{content}</div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <button onClick={() => setIsReplyOpen(!isReplyOpen)}>
            ({numberOfReplys ? numberOfReplys : replys.length}) Reply
          </button>
          <button onClick={() => likePost.mutate()}>
            ({likes.length}) {requesterHasLiked ? "Unlike" : "Like"}
          </button>
          <button onClick={() => router.push("/post/" + id)}>Share</button>
        </div>
      </div>
      {isReplyOpen && (
        <ReplyToPostInput
          postId={id}
          refetch={() => {
            setIsReplyOpen(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};
