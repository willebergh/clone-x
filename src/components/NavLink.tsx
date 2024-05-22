"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const NavLink = ({
  href,
  text,
  badge,
}: {
  href: string;
  text: string;
  badge?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <Link
      href={href}
      className={`text-xl font-semibold hover:bg-gray-100 ${
        pathname === href ? "bg-blue-500 text-white hover:bg-blue-300" : ""
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
