import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapters: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  database: process.env.DATABASE_URL,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export default handler;
