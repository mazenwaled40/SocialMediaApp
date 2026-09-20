import {Socket} from "socket.io";
import userModel from "../../../user/models/user.model";

export class ChatSocketService{







async sendMessage({
    socket,
    data,
}:{socket:Socket;
    data: {
    content:string,
    sentTo:string
}}




)} {
    try{
         const createdBy = Socket.user._id//هو محتاج من السوكيت مين الشخص اللي بعت المسدج اللي هو createdby
        const{content,sentTo}=data
const friend = await userModel.findById(sentTo)

    }
    catch(err)
    Socket.emit("custom_error",err)
}

async joinGroup({socket:Socket,roomId:string})
try{
    const group = await chatModel.findOne({
        group:{
            $exist:true
        },
        participants:{
            $in:[socket._id]
        }
roomId,
    })
    if(!Chat){
        throw new Error("group not found")
    }
socket.join(roomId)
}
catch(error){
Socket.emit("custom Error",err)
}



export const ChatSocketservice = new ChatSocketService() 