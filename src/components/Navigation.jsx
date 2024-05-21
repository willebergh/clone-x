"use client";

import Link from "next/link";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: api.getCurrentUser,
  });

  return (
    <header className="border-r border-black">
      <nav className="p-8 flex flex-col gap-4">
        <h1 className="text-xl font-bold px-4 py-2">Clone X</h1>
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
          className="text-xl font-semibold hover:bg-gray-100 px-4 py-2"
          href={"/"}
        >
          Notifications
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
