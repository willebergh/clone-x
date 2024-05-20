"use client";

import { redirect } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const providers = {
  Github: () => signIn("github"),
  Google: () => signIn("github"),
  Apple: () => signIn("github"),
};

export default () => {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [data]);

  return (
    <div className="p-8 flex flex-row-reverse justify-center items-center gap-16">
      <div className="">
        <h1 className="mb-4">Välkommen!</h1>
        <p>
          Logga in
          <br />
          med en av
          <br />
          tjänsterna
          <br />
          för att
          <br />
          komma
          <br />
          vidare.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(providers).map(([key, func]) => (
          <button className="bg-teal-500 px-8 py-2" key={key} onClick={func}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};
