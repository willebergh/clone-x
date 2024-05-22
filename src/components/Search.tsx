"use client";

import api from "@/lib/axios";
import { useState, useEffect, ChangeEventHandler } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "prisma/prisma-client";
import Link from "next/link";

export default () => {
  const [query, setQuery] = useState("");

  const users = useMutation({
    mutationFn: () => api.searchUser(query),
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    users.mutate();
  };

  return (
    <div className="border-l border-black">
      <input
        className="w-full focus:outline-none focus:ring-0 border-b border-black p-4  text-xl font-bold "
        value={query}
        onChange={handleOnChange}
        placeholder="Search for users..."
      />
      <div className="p-4 gap-4 flex flex-col">
        {query !== "" &&
          users.isSuccess &&
          users.data.map((user: User) => (
            <Link
              href={"/users/" + user.id}
              className="flex flex-row gap-2 items-center border border-black p-2"
            >
              <img className="w-6" src={user.image || ""} />
              <span className="">{user.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};
