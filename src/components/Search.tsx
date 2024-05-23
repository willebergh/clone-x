"use client";

import api from "@/lib/axios";

import Link from "next/link";
import Image from "next/image";
import { User } from "prisma/prisma-client";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, ChangeEventHandler } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const session = useSession();

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
      {session.status === "authenticated" ? (
        <input
          className="w-full focus:outline-none focus:ring-0 border-b border-black p-4  text-xl font-bold "
          value={query}
          onChange={handleOnChange}
          placeholder={
            session.status !== "authenticated" ? "" : "Search for users..."
          }
          disabled={session.status !== "authenticated"}
        />
      ) : (
        <div className="text-xl font-bold py-4 px-10 border-b border-black text-right">
          {"X enolC"}
        </div>
      )}
      <div className="p-4 gap-4 flex flex-col">
        {query !== "" &&
          users.isSuccess &&
          users.data.map((user: User) => (
            <Link
              key={user.id}
              href={"/users/" + user.id}
              className="flex flex-row gap-2 items-center border border-black p-2"
            >
              <Image
                height={100}
                width={100}
                alt={user.name || ""}
                className="w-6"
                src={user.image || ""}
              />
              <span className="">{user.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
