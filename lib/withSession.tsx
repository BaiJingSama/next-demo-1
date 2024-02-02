import { NextApiHandler } from 'next'
import {withIronSession} from 'next-iron-session'

export function withSession(handler:NextApiHandler){
  return withIronSession(handler,{
    // password: process.env.SECRET_COOKIE_PASSWORD, 加密的密钥
    password: '50627CFA-0AA5-D53F-12C1-FE09D9802446', // 随机数 
    cookieName:'blog',
    cookieOptions: {
      secure:false
    }
  })
}