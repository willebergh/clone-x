"use client";

import api from "@/lib/axios";
import Post from "@/components/Post";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default () => {
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

  if (user.isLoading) {
    return (
      <div className="border-b border-black">
        <h1>LOADING</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-black p-4">
        {user.isSuccess && (
          <div className="flex flex-row items-center gap-4 jusitfy-beteween">
            <img className="max-w-16" src={user.data.image} />
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
                <div className="flex flex-col  hover:bg-gray-100">
                  <span className="text-center">Following</span>
                  <span className="text-center text-xl font-semibold">
                    {user.data.following.length}
                  </span>
                </div>
              </div>
              <button onClick={handleActionButtonClick} className="bg-blue-300">
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

      {posts.isSuccess && posts.data.map((post) => <Post {...post} />)}
    </div>
  );
};
