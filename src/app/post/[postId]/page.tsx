"use client";

import api from "@/lib/axios";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import ReplyOfPost from "@/components/ReplyOfPost";

import { Reply, User } from "prisma/prisma-client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface ReplyWithUser extends Reply {
  user: User;
}

const PostPage = () => {
  const params = useParams();

  const post = useQuery({
    queryKey: ["post", params?.postId],
    queryFn: () => api.getPost(params?.postId as string),
  });

  if (post.error) {
    return "error";
  }

  return (
    <>
      <PageTitle content="Post" />
      {post.isLoading && <Loading />}

      {post.isSuccess && (
        <>
          <Post {...post.data} refetch={post.refetch} />
          {post.data.replys.map((reply: ReplyWithUser) => (
            <ReplyOfPost
              key={reply.id}
              content={reply.content}
              user={reply.user}
            />
          ))}
        </>
      )}
    </>
  );
};

export default PostPage;
