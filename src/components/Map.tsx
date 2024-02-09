/* global kakao */
import Script from "next/script";

declare global{
  interface window{
    kakao: any;
  }
}
export default function Map() {
  const loadKakaoMAp=()=>{
    // kakao map 로드
    window.kakao.maps.load(()=> {
      const mapContainer = document.getElementById("map")
      const mapOption ={
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level:3,
      }
      new window.kakao.maps.Map(mapContainer, mapOption)
  });
  }

  return (
    <>
      <Script strategy="afterInteractive" type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`} onReady={loadKakaoMAp}/>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
