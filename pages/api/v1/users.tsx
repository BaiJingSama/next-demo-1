import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/entity/User";


const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  // 先设置响应头，因为在write后就不能再设置响应头
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  const { username, password, passwordConfirmation } = req.body
   // 建立数据库链接
  const connection = await getDatabaseConnection()
  // 创建实例
  const user = new User()
  user.username = username.trim()
  user.password = password
  user.passwordConfirmation = passwordConfirmation
  

  await user.validate()
  if(user.hasErrors()){
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  } else {
    // 将数据保存进数据库中
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}

export default Users;