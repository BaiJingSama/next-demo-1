import React,{useCallback} from "react"
import Link from 'next/link'
import Head from "next/dist/next-server/lib/head";

console.log('执行了');
export default function FirstPost() {
  const clickMe = useCallback(()=>{
    console.log('you click me');
  },[]) // 只会在最开始执行一次
  return (
    <>
      <div>First Post
      <button onClick={clickMe}>点我</button>
      <hr />
      <h1>回到首页
       <Link href="/"><a>点击这里</a></Link>
      </h1>
    </div>
    </>
  )
}