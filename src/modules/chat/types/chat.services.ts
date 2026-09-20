import { chatmodel } from "../models/chat.model";
import { HydratedDocument } from "mongoose";
import { Huser } from "../../user/types/user.types";
import { userModel } from "../../user/models/user.model";
import id from "zod/v4/locales/id.js";



class chatService{


    async getchat({user,id}:{user:Iuser , id:string})
    const friend = await userModel.findById(.id)
if(!friend){
    throw new Error("Friend Not Found")
}
 let chat = await chatmodel.findOne({
group:{
    exist:false
},
participants:{
$all:{friend.id, Huser.id}
}
//.populate(participants)

 })
if(!chat)
    await chatmodel.create({
        participants:[
            user.id,friend.id
        ],
        createdby:user.id

    })

async createGroup({participants , user , group}:{participants:string[], user:Huser , group:string})

const foundedParticipant = await userModel.find({
    id:{
        $in:participants
    }
})
if(participant.length!=foundedParticipant.length)
    throw new Error("not found exception")
const roomId = nanoid(20)

const newGroup = await chatmodel.create({
    participants,
    group
    roomId,
    createdBy:User.-id
}) 
async getGroupChat({groupId, user}:{groupId:String , user:String })
const getGroup = await chatmodel.findOne({
    id:groupId,
    group:{
        $exist:true
    },
    participants:{
        $in:{user.id}
    }

}).populate(message.createdBy)
If(!chat){
throw new Error("chat not found")
}
return{
    data:{
        chat
    }
})

}

 