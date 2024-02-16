import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";




interface StoreProps{
    store:any;
    setStore:Dispatch<SetStateAction<any>>;
}

export default function StoreBox({store, setStore}){
    return<div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
        {store && (
        <>
            <div className="p-8">
            <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <Image src={store?.bizcnd_code_nm ?`/images/markers/${store?.bizcnd_code_nm}.png`:'/images/markers/default.png'}
                            width={40}
                            height={40}
                            alt="아이콘 이미지"
                            />
                        <div>
                            <div className="font-semibold">{store?.upso_nm}</div>
                            <div className="text-sm">{store?.cob_code_nm}</div>
                        </div>
                    </div>
                
                    <button type="button" onClick={()=>setStore(null)}><IoClose />
    </button>
            </div>
            <div className="mt-4 flex gap-2 items-center">
                    <FiMapPin/>
                    {store?.rdn_code_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <FaPhone/>
                    {store.tel_no?store.tel_no:(<span>등록된 번호가 없습니다.</span>)}
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <CiCircleInfo/>
                    {store?.crtfc_gbn_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
                    <FaCheck/>
                    {store?.bizcnd_code_nm}
            </div>
            </div>
            <button type='button' onClick={()=> window.alert("상세보기작업")}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg">
                상세보기
            </button>
        </>
        )}
    </div>;
}