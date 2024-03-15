import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { LikeInterface,LikeApiResponse } from "@/interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LikeInterface|LikeApiResponse>
){
    const session = await getServerSession(req, res, authOptions)

    if(!session?.user){
        return res.status(401)
    }
    if(req.method === "POST"){
        // 찜하기로직처리
        const { storeId }: { storeId: number } = req.body;

        // Like 데이터가 있는지 확인
        let like = await prisma.like.findFirst({
          where: {
            storeId,
            userId: session?.user?.id,
          },
        });

        // 이미찜이 있을시, like데이터 삭제, 아니라면 생성
        if(like){
            // 이미 찜했을때(삭제)
            like = await prisma.like.delete({
                where:{
                    id:like.id
                }
            })
            return res.status(204).json(like)
        }else{
            // 찜안했을때(생성)
            like = await prisma.like.create({
                data: {
                    storeId,
                    userId:session?.user?.id,
                }
            })
            return res.status(201).json(like)
        } 
    }else{
        // GET요청처리
        const likes = await prisma.like.findMany({
            orderBy:{createdAt:"desc"},
            where:{
                userId:session.user.id
            },
            include:{
                store:true
            }
        })
        return res.status(200).json({
            data: likes,
        })
    }
}