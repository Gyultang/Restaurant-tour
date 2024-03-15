import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { StoreType } from "@/interface"
import { useRouter } from "next/router";
import { useRecoilState} from "recoil";
import { currentStoreState } from "@/atom";
import Like from "./Like";




export default function StoreBox(){
    const [store,setStore] = useRecoilState(currentStoreState)
    const router = useRouter()


    return<div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
        {store && (
        <>
            <div className="p-8">
            <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <Image src={store?.category ?`/images/markers/${store?.category}.png`:'/images/markers/default.png'}
                            width={40}
                            height={40}
                            alt="아이콘 이미지"
                            />
                        <div>
                            <div className="font-semibold">{store?.name}</div>
                            <div className="text-sm">{store?.storeType}</div>
                        </div>
                    </div>
                
                    <button type="button" onClick={()=>setStore(null)}><IoClose />
                    </button>
            </div>
            <div className="flex justify-between gap-4">
                <div className="mt-4 flex gap-2 items-center col-span-3">
                        <FiMapPin/>
                        {store?.address||"등록된 주소가 없습니다."}
                </div>
                <Like storeId={store.id}/>
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <FaPhone/>
                    {store.phone?store.phone:(<span>등록된 번호가 없습니다.</span>)}
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <CiCircleInfo/>
                    {store?.foodCertifyName}
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <FaCheck/>
                    {store?.category}
            </div>
            </div>
            <button type='button' onClick={()=> router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg">
                상세보기
            </button>
        </>
        )}
    </div>;
}