"use client";

import { useQuery } from "@tanstack/react-query";
import NavLink from "@/components/NavLink";
import api from "@/lib/axios";

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
        <NavLink href="/create-post" text="Tweet" />

        <NavLink href="/" text="Home" />

        <NavLink
          href={user.isSuccess ? "/users/" + user.data.id : "/"}
          text="Profile"
        />

        <NavLink
          href="/notifications"
          text="Notifications"
          badge={
            unreadNotifications.isSuccess &&
            unreadNotifications.data.length > 0 &&
            unreadNotifications.data.length
          }
        />

        <NavLink href="/logout" text="Sign Out" />
      </nav>
    </header>
  );
};
