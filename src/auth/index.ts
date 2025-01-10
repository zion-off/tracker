import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";

import { userExists, createUser, getUserId } from "@/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const existingUser = await userExists(user.email as string);
      if (!existingUser) {
        return createUser(user.email as string);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const id = await getUserId(user.email as string);
        token.id = id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
