import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { default as NextAuth, User, Account, Profile } from "next-auth";
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

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile;
    }) {
      try {
        const { email, name, image } = user;
        const { provider, providerAccountId, access_token, token_type, scope } =
          account;

        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: provider,
              providerAccountId: providerAccountId,
            },
          },
          include: {
            user: true,
          },
        });

        if (existingAccount) {
          console.log("Existing account:", existingAccount);
          return true;
        }

        let existingUser = await prisma.user.findUnique({
          where: { email: email || "" },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email,
              name,
              image,
            },
          });

          console.log("New user created:", existingUser);
        }

        const newAccount = await prisma.account.create({
          data: {
            userId: existingUser.id,
            type: "oauth",
            provider,
            providerAccountId,
            access_token,
            token_type,
            scope,
          },
        });

        console.log(newAccount);

        console.log("New user created:", existingUser);
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export default handler;
