"use client";

import api from "@/lib/axios";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Post as PostType, User, Like, Reply } from "prisma/prisma-client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface PostWithItAll extends PostType {
  requesterHasLiked?: boolean;
  numberOfReplys?: number;
  user: User;
  likes: Like[];
  replys: Reply[];
}

const UserPage = () => {
  const params = useParams();
  const session = useSession();

  const user = useQuery({
    queryKey: ["user", params?.userId],
    queryFn: () => api.getUser(params?.userId as string),
  });

  const posts = useQuery({
    queryKey: ["user-posts", params?.userId],
    queryFn: () => api.getUserPosts(params?.userId as string),
  });

  const followUser = useMutation({
    mutationFn: () => api.followUser(params?.userId as string),
    onSuccess: user.refetch,
  });

  const handleActionButtonClick = async () => {
    if (session.data?.user?.email === user.data.email) {
      return;
    } else {
      followUser.mutate();
    }
  };

  return (
    <>
      <PageTitle content="Profile" />

      {user.isLoading && <Loading />}

      {user.isSuccess && (
        <>
          <div className="border-b border-black p-4">
            {user.isSuccess && (
              <div className="flex flex-row items-center gap-4 jusitfy-beteween">
                <Image
                  height={100}
                  width={100}
                  alt={user.data.id}
                  className="max-w-16"
                  src={user.data.image}
                />
                <div className="flex flex-col ">
                  <span>{user.data.name}</span>
                  <span>{user.data.email}</span>
                </div>
                <div className="grow" />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-8">
                    <div className="flex flex-col ">
                      <span className="text-center">Followers</span>
                      <span className="text-center text-xl font-semibold">
                        {user.data.followed.length}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-center">Following</span>
                      <span className="text-center text-xl font-semibold">
                        {user.data.following.length}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleActionButtonClick}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    {session.data?.user?.email === user.data.email
                      ? "Edit Profile"
                      : user.data.isFollowing
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {posts.isLoading && "Loading posts"}

          {posts.isSuccess &&
            posts.data.map((post: PostWithItAll) => (
              <Post key={post.id} {...post} refetch={posts.refetch} />
            ))}
        </>
      )}
    </>
  );
};

export default UserPage;
