import { Server as httpserver } from "http";
import { Server, Socket } from "socket.io";
import { decodeToken } from "../../../middlewares/auth.middleware";
import { isObjectIdOrHexString } from "mongoose";
import { redisclient } from "../../../db/redis.connection";
import { connectedSocketsKey } from "../../../utils/redis/redis.service";
export const inizializeio = (httpserver: httpserver) => {
  const io = new Server(httpserver, {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    try {
      // const token = socket.handshake.auth.token
      const token = socket.handshake.headers.authorization;

      const { User :string} = await decodeToken(token as string);
      (socket:string).user = user;

      next();
    } catch (err) {
      console.log(err);
      next(err as Error);
    }
  });


io.on("connect",(socket:Socket) =>{
//هحط هنا اللي المفروض يحصل اول ما حد يعمل كونكت او لوجين




    socket.on("login sucssefuly",(data) =>{

    })
})

};







const registerNewUser = async(socket:Socket) =>{
    let userSocket : string | null | string[]  = await redisclient.get(connectedSocketsKey(socket.user.id))
    if(userSocket){
    userSocket = JSON.parse(userSocket)
await redisclient.set(connectedSocketsKey(socket.user.id),JSON.stringify([socket.id]) , ...userSocket as [])
    }else{
     await redisclient.set(connectedSocketsKey(socket.user.id),JSON.stringify([socket.id])   
    }
        
    }

      
    const revokeUser = async(socket: Socket) =>{
        let userSockets = await redisclient.get(connectedSocketsKey(socket.user.id))    
    const newUserSockets = JSON.parse(userSockets as string) as string[]
    newUserSockets.filter((ele) =>{
        return ele != socket.id
    } )
    if (newUserSockets.length == 0){
        await redisclient.del(connectedSocketsKey(socket.user.id))

    }else{
        await redisclient.set (connectedSocketsKey(socket.user.id),JSON.stringify(newUserSockets))
    }
    }