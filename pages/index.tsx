import { GetServerSideProps, NextPage } from "next"
import React from "react"
import { UAParser } from "ua-parser-js"
import Link from "next/link"
import { createConnection, getConnection } from "typeorm"
import { getDatabaseConnection } from "lib/getDataBaseConnection"
type Props = {
  browser: {
    name:string
  }
}
const index:NextPage<Props> = (props) => {
  const {browser} = props
  return (
    <div>
      <h1>你的浏览器1是{browser.name}</h1>
    </div>
  )
}

export default index

export const getServerSideProps:GetServerSideProps = async (context)=>{
  const connection =  await getDatabaseConnection()
  // console.log(connection);

  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return{
    props:{
      browser:result.browser
    }
  }
}

