import type { GetServerSideProps, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";

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
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
