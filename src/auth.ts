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
  },
  events: {
    async createUser(message) {
      // message.user には作成されたユーザーの情報が含まれる
      // message.user.id を使って初期化処理を行う
      if (message.user.id) {
        const userId = message.user.id;
        const allCleanings = await prisma.cleaning.findMany({
          select: { cleaningId: true } // cleaningId のみ取得
        });

        if (allCleanings.length > 0) {
          const userCleaningDataToCreate = allCleanings.map(cleaning => ({
            userId: userId,
            cleaningId: cleaning.cleaningId,
            do: true, // 初期状態
            done: false // 初期状態
          }));

          await prisma.user_cleaning.createMany({
            data: userCleaningDataToCreate,
            skipDuplicates: true, // 念のため (複合ユニークキーがある前提)
          });
          console.log(`Initialized user_cleaning records for new user: ${userId}`);
        }
      }
    }
  }
}
// })

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);