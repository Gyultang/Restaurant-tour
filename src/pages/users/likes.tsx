import Loading from "@/components/Loading"
import StoreList from "@/components/StoreList"
import { LikeApiResponse, LikeInterface } from "@/interface"
import axios from "axios"
import React from "react"
import { useQuery } from "react-query"

export default function LikePage(){
    const fetchLikes = async()=>{
        const {data} = await axios('/api/likes')
        return data as LikeApiResponse
    }

    const {data:likes, isError,isLoading}=useQuery("likes",fetchLikes)
    if(isError){
        return <div className='w-full h-screen text-center mx-auto pt-[10%] text-red-500   font-semibold'>다시 시도해주세요</div>
    }
    return(
        <div className="px-4 md:max-w-5xl mx-auto py-8">
            <h3 className="text-lg font-semibold">찜한 맛집</h3>
            <div className="mt-1 text-gray-500 text-sm">
                찜한 가게 리스트입니다.
            </div>
            <ul role="list" className="divide-y divide-gray-100 mt-1">
                {isLoading ? (
                <Loading />
                ) : (
                likes?.data.map((like:LikeInterface,index)=><StoreList i={index} store={like.store} key={index}/>)
                )}
            </ul>
        </div>
    )
}