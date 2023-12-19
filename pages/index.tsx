import { GetServerSideProps, NextPage } from "next"
import React from "react"
import { UAParser } from "ua-parser-js"
import Link from "next/link"
type Props = {
  browser: {
    name:string
  }
}
const index:NextPage<Props> = (props) => {
  const {browser} = props
  return (
    <div>
      <h1>你的浏览器是{browser.name}</h1>
    </div>
  )
}

export default index

export const getServerSideProps:GetServerSideProps = async (context)=>{
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return{
    props:{
      browser:result.browser
    }
  }
}