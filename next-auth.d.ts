import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            id?: number;
            // next-auth 기본타입
            name?:string;
            email?:string;
            image?:string;
        }
    }
}