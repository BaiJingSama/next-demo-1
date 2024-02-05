import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { getDatabaseConnection } from "lib/getDataBaseConnection";
import bcrypt from 'bcryptjs' // 密码加密库
import _ from "lodash";
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany('Post', 'author')
  posts: Post[];
  @OneToMany('Comment', 'user')
  comments: Comment[]

  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation:[] as string[]
  };
  password: string;
  passwordConfirmation: string;
  async validate() {
    // 错误判断
    if (this.username.trim() === '') {
      this.errors.username.push('不能为空')
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push('用户名格式不合法')
    }
    if (this.username.trim().length > 24 || this.username.trim().length <= 4) {
      this.errors.username.push('用户名长度必须为4-24位')
    }

    // 从数据库中搜索用户名是否存在
    const found = await (await getDatabaseConnection()).manager.find(
      User, { username: this.username }
    )
    if (found.length>0) {
      this.errors.username.push('用户名已存在，不能重复注册')
    }

    if (this.password === '') {
      this.errors.password.push('密码不能为空')
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('两次密码不一致')
    }
  }
  hasErrors(){
    // 判断是否有错误
    return !!Object.values(this.errors).find(v => v.length>0)
  }
  @BeforeInsert()
  generatePasswordDigest(){
    // 生成salt值
    const salt = bcrypt.genSaltSync(10);
    // 将密码和salt值一起散列化将结果的hash值保存为密码
    this.passwordDigest = bcrypt.hashSync(this.password, salt);
  }

  // toJSON方法能让JSON.stringify()能将对象转换为方法返回的字符串
  toJSON(){
    // omit方法能从一个对象中忽略指定的属性，可以自己实现，也能直接用库，大部分的库都有 例如lodash
    return _.omit(this,['password','passwordConfirmation','passwordDigest','errors'])
  }
}
