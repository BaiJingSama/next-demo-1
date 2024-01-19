import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/entity/User";
import bcrypt from 'bcryptjs' // 密码加密库


const Users = async(req:NextApiRequest,res:NextApiResponse) => {
  const {username,password,passwordConfirmation} = req.body
  const errors = {
    username: [],
    password: [],
    passwordConfirmation: []
  }
  if(username.trim() === ''){
    errors.username.push('不能为空')
  }
  if(!/[a-zA-Z0-9]/.test(username.trim())){
    errors.username.push('用户名格式不合法')
  }
  if(username.trim().length > 24 || username.trim().length <= 4){
    errors.username.push('用户名长度必须为4-24位')
  }

  if(password === ''){
    errors.password.push('密码不能为空')
  }
  if(password !== passwordConfirmation){
    errors.passwordConfirmation.push('两次密码不一致')
  }

  const hasErrors = Object.values(errors).find(v => v.length>0)

  res.setHeader('Content-Type','application/json;charset=utf-8')
  if(hasErrors){
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  }else{
    // 建立数据库链接
    const connection =  await getDatabaseConnection()
    // 创建实例
    const user = new User()

    user.username = username.trim()
    // 生成salt值
    const salt = bcrypt.genSaltSync(10);
    // 将密码和salt值一起散列化将结果的hash值保存为密码
    user.passwordDigest = bcrypt.hashSync(password, salt);
    // 检查密码是否匹配
    const isMatch = bcrypt.compareSync(password, user.passwordDigest);
    console.log(isMatch, '加密后的密码是否匹配');
    if(isMatch){
      await connection.manager.save(user)
      res.statusCode = 200
      res.write(JSON.stringify(user))
    }
  }
  
  res.end()
}

export default Users;