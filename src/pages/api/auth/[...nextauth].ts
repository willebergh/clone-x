import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { default as NextAuth, User, Account, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export default handler;
