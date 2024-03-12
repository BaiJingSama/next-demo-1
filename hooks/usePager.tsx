import Link from "next/link"
import _ from "lodash"

type Options = {
  count: number,
  page: number,
  totalPage: number,
  urlMaker?: (n:number) => string;
}

const defaultUrlMaker = (n:number) => `?page=${n}`

export const usePager = (options:Options) =>{
  const {count,page,totalPage,urlMaker} = options
  const _urlMaker = urlMaker || defaultUrlMaker
  // 页码列表是一个数组
  const numbers = []
  numbers.push(1) // 先添加第一页
  for(let i = page - 3; i <= page + 3; i++){
    numbers.push(i)
  }
  numbers.push(totalPage) // 最后添加最后一页
  const pageNumbers = _.uniq(numbers).sort().filter(n=> n >= 1 && n <= totalPage).reduce((result,cur)=>{
    if(cur - (result[result.length - 1]||0) === 1){
      return result.concat(cur)
    }else {
      return result.concat(-1,cur)
    }
  },[])
  const pager = (
    <div className="wrapper">
      {page !== 1 && <Link href={_urlMaker(page - 1)}><a>上一页</a></Link> }
      {pageNumbers.map(n => n === -1 ? <span key={n}>...</span> : <Link key={n} href={_urlMaker(n)}><a>{n}</a></Link>)}
      {page < totalPage && <Link href={_urlMaker(page + 1)}><a>下一页</a></Link>}
      <span>共{count}篇文章，第{page}/{totalPage}页</span>
      <style jsx>{`
        .wrapper{
          margin: 0 -8px;
        }
        .wrapper > a,.wrapper > span{
          margin: 0 10px;
        }
      `}</style>
    </div>
  )
  return {
    pager
  }
}