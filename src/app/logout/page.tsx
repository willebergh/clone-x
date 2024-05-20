"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      signOut()
        .then(() => {
          redirect("/login");
        })
        .catch(console.error);
    }

    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  return (
    <div>
      <h1>Bye!</h1>
    </div>
  );
};
