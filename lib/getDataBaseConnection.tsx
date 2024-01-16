import { createConnection, getConnectionManager } from "typeorm";

async function create(){ 
  const manager = getConnectionManager()
  const hasDefaultConnection = manager.has('default')
  if(!hasDefaultConnection){
    return createConnection()
  }else{
    const currentConnection = manager.get('default')
    // 判断是否是当前选择的默认连接
    if(currentConnection.isConnected){
      return currentConnection
    }else{
      return createConnection()
    }
  }
  
}

 const promise = create()

export const getDatabaseConnection = async () =>{
  return promise
}