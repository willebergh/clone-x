import moment from "moment";
import Link from "next/link";
import { User } from "prisma/prisma-client";

export default ({ content, user }: { content: string; user: User }) => {
  return (
    <div className="border-b border-black px-8 py-4 flex flex-row items-center gap-4">
      <img className="h-8" src={user.image || ""} alt="" />

      <div className="flex flex-col">
        <span>
          <Link href={"/users/" + user.id}>{user.name}</Link>{" "}
          <span className="text-gray-500">replied with</span>
        </span>
        <p>{content}</p>
      </div>
    </div>
  );
};
