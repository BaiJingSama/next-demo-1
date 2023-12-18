import Head from "next/head"
import "styles/global.scss"
export default function App({Component,pageProps}){
  return <>
      <Head>
        <title>我的博客demo - 白境</title>
        <meta name="viewport"/>
      </Head>
      <Component {...pageProps}/>
    </>
}