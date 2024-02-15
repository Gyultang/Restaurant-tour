import Map from "@/components/Map";
import Markers from"@/components/Markers";
import * as stores from "@/data/store_data.json";
import { useState } from "react";


export default function Home() {
  const [map,setmMap] = useState(null)
  const storeDatas = stores['DATA']
  return (
    <>
      <Map/>
      <Markers storeDatas={storeDatas} map={map}/>
    </>
  );
}
