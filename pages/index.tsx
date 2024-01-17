import { GetServerSideProps, NextPage } from "next"
import React from "react"
import { UAParser } from "ua-parser-js"
import Link from "next/link"
// import { createConnection, getConnection } from "typeorm"
import { getDatabaseConnection } from "lib/getDataBaseConnection"
import { Post } from "src/entity/Post"
type Props = {
  posts: Post[]
}
const index:NextPage<Props> = (props) => {
  const {posts} = props
  console.log(posts);
  
  return (
    <div>
      123456
      {posts.map(post => <div>{post.title}</div>)}
    </div>
  )
}

export default index

export const getServerSideProps:GetServerSideProps = async (context)=>{
  const connection =  await getDatabaseConnection()

  const posts = await connection.manager.find(Post)

  return{
    props:{
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

