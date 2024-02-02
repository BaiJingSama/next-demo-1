import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";
import bcrypt from 'bcryptjs' // 密码加密库

const Sessions: NextApiHandler = async(req, res) => {
  // 从请求体中拿到用户名和密码
  const {username,password} = req.body;
  // 建立数据库链接
  const connection =  await getDatabaseConnection()
  const user = await connection.manager.findOne(User,{where:{username}})
  res.setHeader('Content-Type','application/json;charset=utf-8')
  if(user){
    // console.log(user);
    // 判断数据库的密码和用户输入密码的加密hash是否一致
    const isMatch = bcrypt.compareSync(password, user.passwordDigest);
    if(isMatch){
      res.statusCode = 200;
      res.end(JSON.stringify(user))
    }else{
      res.statusCode = 422;
    res.end(JSON.stringify({password:['密码不匹配']}))
    }

  }else{
    res.statusCode = 422;
    res.end(JSON.stringify({username:['用户名不存在']}))
  }
  // res.setHeader('Content-Type','application/json;charset=utf-8')
  // res.statusCode = 200;
  // res.write('');
  // res.end()
  
}

export default Sessions 