import axios from "axios";
import { useEffect, useState } from "react"

export const usePosts = () =>{
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty,setIsEmpty] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/v1/posts').then(res => {
      setPosts(res.data)
      setIsLoading(false)
      setIsEmpty(!res.data.length)
    }, () => {
      setIsLoading(false)
    })
  }, [])
  return {
    isLoading,
    setIsLoading,
    isEmpty,
    setIsEmpty,
    posts,
    setPosts
  }
}