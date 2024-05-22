"use client";

import Link from "next/link";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: api.getCurrentUser,
  });

  const unreadNotifications = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: api.getUnreadNotifications,
  });

  return (
    <header className="border-r border-black">
      <h1 className="text-xl font-bold py-4 px-10 border-b border-black">
        Clone X
      </h1>
      <nav className="p-8 flex flex-col gap-4">
        <Link
          className="text-xl font-semibold px-4 py-2 hover:bg-gray-100"
          href="/create-post"
        >
          Tweet
        </Link>

        <Link
          className="text-xl font-semibold hover:bg-gray-100 px-4 py-2"
          href="/"
        >
          Home
        </Link>

        <Link
          className="text-xl font-semibold hover:bg-gray-100 px-4 py-2"
          href={user.isSuccess ? "/users/" + user.data.id : "/"}
        >
          Profile
        </Link>

        <Link
          className="text-xl font-semibold hover:bg-gray-100"
          href="/notifications"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="px-4 py-2">Notifications</span>
            {unreadNotifications.isSuccess &&
              unreadNotifications.data.length > 0 && (
                <span className="bg-red-500 px-4 py-2 text-white">
                  {unreadNotifications.data.length}
                </span>
              )}
          </div>
        </Link>

        <Link
          className="text-xl font-semibold hover:bg-gray-100 px-4 py-2"
          href="/logout"
        >
          Sign Out
        </Link>
      </nav>
    </header>
  );
};
