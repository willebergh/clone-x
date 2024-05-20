"use client";

import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const providers = {
  Github: () => signIn("github"),
};

export default async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Login</h1>

      {Object.entries(providers).map(([key, func]) => (
        <button key={key} onClick={func}>
          {key}
        </button>
      ))}
    </div>
  );
};
