import { Socket } from "socket.io"
import { ChatSocketService } from "./chat.socket.service"




class chatEvents{

async sendMessage (socket:Socket)
Socket.on("sendMessage" , (data) =>{
    return ChatSocketService.sendMessage(data,socket)
})
async joinRoom(Socket:socket){
    Socket.on("join room",{roomId}:{roomId:String})=>{
return ChatSocketService,joinroom(Socket,roomId)
    }
    chatEvents.joinRoom(Socket)//السوكيت اللي هنا معناها دخل الشخص ده للروم
}









}







export const chatEvent = new chatEvents()