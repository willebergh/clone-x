import type { GetServerSideProps, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SessionProvider from "@/components/SessionProvider";
import QueryProvider from "@/components/QueryProvider";
import Navigation from "@/components/Navigation";
import Search from "@/components/Search";

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter Clone",
};

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <QueryProvider>
          <body className={inter.className}>
            <div className="grid grid-cols-4">
              <Navigation />
              <div className="col-span-2 ">{children}</div>
              <Search />
            </div>
          </body>
        </QueryProvider>
      </SessionProvider>
    </html>
  );
}
