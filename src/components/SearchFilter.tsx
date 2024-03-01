import { IoSearch } from "react-icons/io5";
import {DISTRICT_ARR} from "@/data/store"
import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "@/atom";


export default function SearchFilter(){
    const [search,setSearch]=useRecoilState(searchState)
    return(
        <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex items-center justify-center w-full gap-2">
                <IoSearch className="w-6 h-6"/>
                <input type="search" onChange={(e)=>setSearch({...search, q:e.target.value})} placeholder="음식점 검색" className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"/>
            </div>
            <select 
            onChange={(e)=>setSearch({...search, district:e.target.value})}
            className="bg-gray-50 border-gray-300 text-gray-800 text-sm md:max-w-[200px] focus:border-blue-500 rounded-lg block w-full p-3 outline-none">
                <option value="">지역 선택</option>
                {DISTRICT_ARR.map((data)=>(
                    <option value={data} key={data}>{data}</option>
                ))}
            </select>
        </div>
    )
}