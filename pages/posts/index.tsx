import { GetServerSideProps, NextPage } from "next"
import React from "react"
import Link from "next/link"
import { getDatabaseConnection } from "lib/getDataBaseConnection"
import { Post } from "src/entity/Post"
import { UAParser } from "ua-parser-js"
import qs from 'querystring'


type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage: number
}
const PostsIndex:NextPage<Props> = (props) => {
  const {posts} = props
  
  return (
    <div>
      <h1>文章列表({props.count}) 每页{props.perPage}</h1>
      {posts.map(post =>
      <div>
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
      </div> 
      )}
      <footer>
        共{props.count}篇文章，当前第{props.page}/{props.totalPage}页
        {props.page !== 1 && <Link href={`?page=${props.page - 1}`}><a>上一页</a></Link> }
        |
        {props.page < props.totalPage && <Link href={`?page=${props.page + 1}`}><a>下一页</a></Link>}
        
      </footer>
    </div>
  )
}

export default PostsIndex

export const getServerSideProps:GetServerSideProps = async (context)=>{
  // 拿到查询参数的分页数据
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  const query = qs.parse(search)
  const page = parseInt(query.page.toString()) || 1

  const connection =  await getDatabaseConnection()
  const perPage = 3
  const [posts,count] = await connection.manager.findAndCount(Post, 
    {skip: (page - 1) * perPage,take: perPage}
  )
  const ua = context.req.headers['user-agent']
  
  

  const result = new UAParser(ua).getResult()

  return{
    props:{
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count, // 文章总数
      perPage, // 每页多少个
      page, // 当前第几页
      totalPage: Math.ceil(count / perPage)
    }
  }
}

