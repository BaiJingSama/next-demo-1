import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreatePost1703060534704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // up用于升级数据库
        return await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type:'int',
                    isPrimary:true, // 主键
                    isGenerated:true, // 自动创建
                    generationStrategy:'increment' // 自增策略
                },
                {
                    name: 'title',
                    type:'varchar', // 可变长度的字符串
                },
                {
                    name: 'content',
                    type: 'text' // 文本 可以无限长
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // down用于降级数据库
        return await queryRunner.dropTable('posts')
    }

}
