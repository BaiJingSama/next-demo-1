import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()('posts')
export class Post {
  @PrimaryGeneratedColumn('increment') // 主键
  id:number;
  @Column('varchar') // 可变长度的字符串
  title: string;
  @Column('text') // 文本 可以无限长
  content: string;
}
