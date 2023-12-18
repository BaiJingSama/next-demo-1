import { NextPage } from "next";
import { usePosts } from "hooks/usePosts";

const PostsIndex: NextPage = () => {
  const {isLoading,isEmpty,posts} = usePosts()
  return (
    <div>
      <h1>文章列表</h1>
      {isLoading ? <div>加载中</div> :
        isEmpty ? <div>没有数据</div> :
          posts.map(p =>
          <div key={p.id}>
            <h1>{p.id}</h1>
            <span>{p.title}</span>
            <span>{p.date}</span>
          </div>
          )
      }
    </div>
  )
}

export default PostsIndex