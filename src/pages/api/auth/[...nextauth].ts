import NextAuth,{NextAuthOptions} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { pages } from "next/dist/build/templates/app-page";
import { sign } from "crypto";
import KakaoProvider from "next-auth/providers/kakao";
import { Session } from "inspector";
import prisma from "@/db";
import { Adapter} from 'next-auth/adapters'



export const authOptions:NextAuthOptions = {
  session:{
    strategy:"jwt" as const, // jwt기반 session을 사용
    maxAge:60*60*24, // 세션의 최대수명 
    updateAge:60*60*2 // 세션을 업데이트하는 주기
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    })

    // ...add more providers here
  ],
  pages:{
    signIn:"/users/login"
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
}
export default NextAuth(authOptions)

