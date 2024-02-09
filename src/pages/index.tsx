import Link from "next/link";


export default function Home() {
  return (
    <>
      <h1 className="font-bold">Map Index Page</h1>
      <ul>
        <li>
          <Link href="/stores">맛집목록</Link>
        </li>
        <li>
          <Link href="/stores/new">맛집생성</Link>
        </li>
        <li>
          <Link href="/stores/1">맛집상세페이지</Link>
        </li>
        <li>
          <Link href="/stores/1/edit">맛집수정페이지</Link>
        </li>
        <li>
          <Link href="/users/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/users/mypage">마이페이지</Link>
        </li>
        <li>
          <Link href="/users/likes">찜한 맛집</Link>
        </li>
      </ul>
    </>
  );
}
