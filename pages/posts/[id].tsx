import { getPost, getPostIds } from "lib/posts"
import { NextPage } from "next"

type Props = {
  post:Post
}

const PostsShow :NextPage<Props>= (props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html:post.htmlContent}}></article>
    </div>
  )
}

export default PostsShow

export const getStaticPaths = async() =>{
  const idList = await getPostIds()
  
  return {
    paths:idList.map(id => ({params:{id:id}})),
    fallback:false // 是否兜底，false表示id不存在时显示404
  }
}

export const getStaticProps = async(staticContext:any) =>{
  const id = staticContext.params.id
  const post = await getPost(id)
  return {
    props:{
      post
    }
  }
}