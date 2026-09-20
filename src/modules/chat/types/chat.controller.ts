import {Router , Request , Response  } from 'express';
import { User } from '../../user/models/user.model';

const router = Router()

export const routes = {
    base:"/chats",
    getChat:"/:id",
    createGroup:"/create-group"
}




base:{

}

router.get(routes.getChat , auth , async(req,res){
const{user} = req
const id = req.params.id as string
const{data} = await chatservice .getChat({user,id})  
}
)


router.get(routes.createGroup, auth , async(req,res)=>{
    const{group , participants } = req.body
const user = req.user,
const {data} = await ChatService.getGroupchat({
    user,
    groupId,
})

})