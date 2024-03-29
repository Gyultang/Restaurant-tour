import { useEffect } from "react";

import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router"; 


export default function LoginPage(){
    const {status,data:session}=useSession()
    const router = useRouter()
    console.log(session)
    useEffect(()=>{
        if(status==='authenticated'){
            router.replace('/')
        }
    },[router,status])
    return(
        <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
            <div className="mx-auto w-full max-w-sm">
                <div className="text-blue-800 text-center text-2xl font-semibold italic">
                    Nextmap
                </div>
                <div className="text-center mt-6 text-2xl font-bold text-gray-600">SNS 계정으로 로그인해주세요</div>
                <p className="text-center mt-2 text-sm text-gray-600">계정이 없다면 자동으로 회원가입이 진행됩니다.</p>
            </div>
            <div className="mt-10 mx-auto w-full max-w-sm">
                <div className="flex flex-col gap-3">
                    <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} className="text-white flex bg-[#4285f4] hover:bg-[#4285f4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center gap-3">
                        <FaGoogle className="h-6 w-6"/>
                        Sign in with Google
                    </button>
                    <button type="button" onClick={()=>signIn('naver',{callbackUrl:'/'})}  className="text-white flex bg-[#2DB400] hover:bg-[#2DB400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center gap-4">
                        <SiNaver className="h-5 w-5"/>
                        Sign in with Naver
                    </button>
                    <button type="button" onClick={()=>signIn('kakao',{callbackUrl:'/'})}className="text-black flex bg-[#FEE101] hover:bg-[#FEE101]/80 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center gap-4">
                        <RiKakaoTalkFill className="h-7 w-7"/>
                        Sign in with Kakao
                    </button>
                </div>
            </div>
        </div>
    )
}