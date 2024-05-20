"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default () => {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <header className="p-4 bg-teal-500">
      <nav className="flex flex-row justify-between items-center">
        <Link href="/">Twitter Clone</Link>

        {data?.user && (
          <>
            <Link href="/me">
              <div className="flex flex-row  items-center">
                <img src={data.user.image || ""} width="30em" />
                <span className="ml-2">{data.user.name}</span>
              </div>
            </Link>

            <Link href="/logout">Logout</Link>
          </>
        )}
      </nav>
    </header>
  );
};
