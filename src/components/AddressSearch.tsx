import { useState } from "react";

import { StoreType } from "@/interface"
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import DaumPostcodeEmbed from 'react-daum-postcode';

interface AddressProps{
    setValue:UseFormSetValue<StoreType>
    register:UseFormRegister<StoreType>
    errors:FieldErrors<StoreType>
}

export default function AddressSearch({setValue, register,errors}:AddressProps){
    const [isOpen,setIsOpen]=useState<boolean>(false)

    const handleComplete = (data:any) => {
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
            // 도로명주소일 경우에 법정동과 빌딩명까지 포함해서 최종주소를 만든다
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
    
        setVaule("address",fullAddress)
    };
    return(
        <>
            <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                    주소 
                </label>
                <div className="mt-2">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        <input
                        readOnly
                        placeholder="주소를 검색해주세요"
                        {...register("address",{required:true})}
                        className="col-span-2 block w-full rounded-md border-0 outline-none py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                        <button type="button" onClick={()=>setIsOpen((val)=>!val)}
                        className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white"
                        >주소 검색</button>
                    </div>
                    
                    {errors?.address?.type === "required" && (
                    <div className="pt-2 text-xs text-red-600">필수 입력사항 입니다.</div>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2 ">
                    <DaumPostcodeEmbed onComplete={handleComplete}/>
                </div>
            )}
        </>
    )
}