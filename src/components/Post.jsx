import Link from "next/link";
import moment from "moment";

export default ({ created_at, content, user }) => {
  return (
    <div className="border border-black p-4 flex flex-col gap-4">
      <div className="flex flex-row gap-4  items-center">
        <img className="w-12" src={user.image} />
        <div className="flex flex-col flex-wrap w-full">
          <div className="flex flex-row justify-between">
            <Link className="font-bold" href={"/users/" + user.id}>
              {user.name}
            </Link>

            <span>{moment(created_at).fromNow()}</span>
          </div>

          <div style={{ wordBreak: "break-word" }}>{content}</div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <button>Reply</button>
        <button>Like</button>
        <button>Share</button>
      </div>
    </div>
  );
};
