import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { User } from "prisma/prisma-client";

const ReplyOfPost = ({ content, user }: { content: string; user: User }) => {
  return (
    <div className="border-b border-black px-8 py-4 flex flex-row items-center gap-4">
      <Image
        height={100}
        width={100}
        alt={user.name || ""}
        className="h-8 w-8"
        src={user.image || ""}
      />

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

export default ReplyOfPost;
