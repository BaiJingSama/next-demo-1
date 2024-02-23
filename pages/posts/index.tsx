import { GetServerSideProps, NextPage } from "next"
import React from "react"
import Link from "next/link"
import { getDatabaseConnection } from "lib/getDataBaseConnection"
import { Post } from "src/entity/Post"
type Props = {
  posts: Post[]
}
const PostsIndex:NextPage<Props> = (props) => {
  const {posts} = props
  console.log(posts);
  
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
      <div>
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
      </div> 
      )}
    </div>
  )
}

export default PostsIndex

export const getServerSideProps:GetServerSideProps = async (context)=>{
  const connection =  await getDatabaseConnection()

  const posts = await connection.manager.find(Post)

  return{
    props:{
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

