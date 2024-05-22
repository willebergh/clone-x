"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({
  href,
  text,
  badge,
}: {
  href: string;
  text: string;
  badge?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-xl font-semibold ${
        pathname === href
          ? "bg-blue-500 text-white hover:bg-blue-300"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <span className="px-4 py-2">{text}</span>

        {Boolean(badge) && (
          <span className="bg-red-500 px-4 py-2 text-white">{badge}</span>
        )}
      </div>
    </Link>
  );
};

export default NavLink;
