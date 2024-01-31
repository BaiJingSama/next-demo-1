import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { getDatabaseConnection } from "lib/getDataBaseConnection";

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
  @OneToMany(type => Post, post => post.author)
  posts: Post[];
  @OneToMany(type => Comment, comment => comment.user)
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
}
