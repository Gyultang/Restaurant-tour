import Link from "next/link"
import { useRouter } from "next/router"

export default function Page(){
    const router = useRouter()
    return(
        <div>
            <h1>Router~!</h1>
            <div>
                <button type="button" onClick={()=>{router.push({pathname:"/[slug]",query:{slug:"push"}})}}>버튼</button>
            </div>
            <br/>
            <div>
                <button type="button" onClick={()=>{router.replace({pathname:"/[slug]",query:{slug:"push"}})}}>replace</button>
            </div>
            <Link href="/hello">HELLO</Link>
        </div>
    )
}