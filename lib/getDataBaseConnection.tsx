import { createConnection, getConnectionManager } from "typeorm";
import 'reflect-metadata'
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";
import config from 'ormconfig.json'

const createEvent = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post,User,Comment]
  })
}

async function create(){ 
  const manager = getConnectionManager()
  const hasDefaultConnection = manager.has('default')
  if(!hasDefaultConnection){
    // @ts-ignore
    return createEvent()
  }else{
    const currentConnection = manager.get('default')
    // 判断是否是当前选择的默认连接
    if(currentConnection.isConnected){
      return currentConnection
    }else{
      // @ts-ignore
      return createEvent()
    }
  }
}

 const promise = create()

export const getDatabaseConnection = async () =>{
  return promise
}