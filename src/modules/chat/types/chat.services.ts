import { chatmodel } from "../models/chat.model";
import { HydratedDocument } from "mongoose";
import { Huser } from "../../user/types/user.types";
import { userModel } from "../../user/models/user.model";



class chatService{


    async getchat ({user,id}:{user:Iuser , id:string})
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



}