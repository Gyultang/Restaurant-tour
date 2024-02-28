import { useRouter } from "next/router"
import { StoreType } from "@/interface"
import axios from "axios"
import { isError, useQuery } from "react-query"
import Loader from "@/components/Loader"
import Map from "@/components/Map"
import Marker from "@/components/Marker"
import { useState } from "react"

export default function StoreDetailPage(){
    const [map,setMap]=useState(null)
    const router = useRouter()
    const {id}=router.query

    const fetchStore = async()=>{
        const {data} = await axios(`/api/stores?id=${id}`)
        return data as StoreType
    }

    const {data:store,isFetching,isError, isSuccess}=useQuery(`store-${id}`,fetchStore,{
        // id값이 없으면 데이터가 fetch가 안되도록 enabled
        enabled:!!id,
        refetchOnWindowFocus: false, 
    })
    if(isError){
        return <div className='w-full h-screen text-center mx-auto pt-[10%] text-red-500   font-semibold'>다시 시도해주세요</div>
    }
    if(isFetching){
        return <Loader className="mt-[20%]" />
    }

    console.log(store, isFetching, isError)
    return(
        <>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{store?.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{store?.address}</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">카테고리</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.category}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">주소</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.address}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">위도</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lat}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">경도</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lng}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">연락처</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {store?.phone}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">식품인증구분</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {store?.foodCertifyName}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">업종명</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {store?.storeType}
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>
            {isSuccess&&<div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]"><Map setMap={setMap} lat={store?.lat} lng={store?.lng} zoom='1'/><Marker map={map} store={store}/></div>}
        </>
    )
}