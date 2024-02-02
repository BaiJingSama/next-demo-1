import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextApiHandler } from "next";
import {SignIn} from '../../../src/model/SignIn'
import { withSession } from "lib/withSession";

const Sessions: NextApiHandler = async(req, res) => {
  // 先设置响应头
  res.setHeader('Content-Type','application/json;charset=utf-8')
  // 从请求体中拿到用户名和密码
  const {username,password} = req.body;
  const signIn = new SignIn()
  signIn.username = username
  signIn.password = password
  await signIn.validate()
  if(signIn.hasErrors()){
    res.statusCode = 422;
    res.end(JSON.stringify(signIn.errors))
  }else{
    req.session.set('currentUser',signIn.user)
    await req.session.save()
    res.statusCode = 200
    res.end(JSON.stringify(signIn.user))
  }  
}

export default withSession(Sessions)