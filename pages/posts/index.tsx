import { NextPage } from "next";
// import { usePosts } from "hooks/usePosts";
import { getPosts } from "lib/posts";
import Link from 'next/link'
import React from "react";

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  
  console.log(props.posts);
  
  const {posts} = props
  return (
    <div>
      <h1>文章列表</h1>
      {
        posts.map(p=>
          <div key={p.id}>
            <Link href="/posts/[id]" as={`/posts/${p.id}`}>
              <a>
                {p.title}
              </a>
            </Link>
            <p>{p.date}</p>
          </div>
        )
      }
    </div>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
 const posts = await getPosts()
  return {
    props:{
      posts: posts
    }
  }
}

