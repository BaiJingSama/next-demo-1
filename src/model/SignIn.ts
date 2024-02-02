
import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { User } from "src/entity/User";
import bcrypt from 'bcryptjs' // 密码加密库

export class SignIn{
  username: string;
  password: string;
  user: User;

  errors = {
    username: [] as string[],
    password: [] as string[]
  }
  // 登录的校验逻辑
  async validate(){
    if(this.username.trim() === ''){
      this.errors.username.push('请填写用户名')
    }
    const connection = await getDatabaseConnection()
    const user = await connection.manager.findOne(User,{where:{username:this.username}})
    this.user = user;
    if(user){
      // 判断数据库的密码和用户输入密码的加密hash是否一致
      const isMatch = bcrypt.compareSync(this.password, user.passwordDigest);
      if(!isMatch){
        this.errors.password.push('密码与用户名不匹配')
      }
    }else{
      this.errors.username.push('用户名不存在')
    }
  }

  hasErrors(){
    // 判断是否有错误
    return !!Object.values(this.errors).find(v => v.length>0)
  }
}