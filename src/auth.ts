//src/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth"
// import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // ユーザーオブジェクトが存在し、かつユーザーIDが存在する場合にトークンにIDを追加
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションのユーザーオブジェクトとトークンIDが存在する場合にセッションにIDを追加
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }
}
// })

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);