## 创建容器并创建数据库 新版docker
```
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 进入容器
```
docker exec -it <容器id> bash
```

## 进入数据库
```
psql -U blog -W
```

## 创建数据库
```
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 清空之前的开发环境
```
docker kill <容器id>

docker rm <容器id>
// mac或新版docker
rm -rf blog-data 

// window旧版docker
docker container prune //删掉没有用到的容器
docker volume rm blog-data
```

## 数据表
- 修改项目中的ormconfig.json中的host配置，然后运行
`yarn m:run`
- 如果要填充数据需要修改seed.ts文件，为表添加数据，然后运行
`node dist/seed.ts`

## 开发
```
yarn dev
yarn m:create -n <表名> // 添加表配置文件
yarn m:run // 表的配置选项写进数据库
yarn e:create // 创建实体文件
```