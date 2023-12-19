import matter from 'gray-matter'
import fs,{promises as fsPromises} from 'fs'
import path from "path";
import marked from 'marked'

const markdownDir =  path.join(process.cwd(),'markdown' )// current workding dir

export const getPosts = async () =>{
  const fileNames = await fsPromises.readdir(markdownDir)
  
  const posts = fileNames.map(name =>{
    const fullPath = path.join(markdownDir,name)  
    const id = name.replace(/\.md$/g,'') 
    const text = fs.readFileSync(fullPath,'utf8')
    const {data:{title,date},content} = matter(text)
    return {
      id,title,date
    }
  })
  
  return posts
}

export const getPost = async (id:string) =>{
  const fullPath = path.join(markdownDir,id+'.md')  
    const text = fs.readFileSync(fullPath,'utf8')
    const {data:{title,date},content} = matter(text)
    const htmlContent = marked(content)
    return {
      id,title,date,htmlContent
    }
}

export const getPostIds = async()=>{
  const fileNames = await fsPromises.readdir(markdownDir)
  return fileNames.map(name =>{
    return name.replace(/\.md$/g,'')
  })
}