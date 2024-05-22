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
    <div className="p-4 border-l border-black gap-4 flex flex-col">
      <input
        className="w-full focus:outline-none focus:ring-0 border border-black p-2 mt-2"
        value={query}
        onChange={handleOnChange}
        placeholder="Search for users..."
      />

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
  );
};
