import {Router} from 'express';
const router = Router()

export const routes = {
    base:"/chats",
    getChat:"/:id"
}




base:{

}

router.get(routes.getchat , auth , async(req,res){
const{user} = req
constid = req.params.id as string
const{data} = await chatservice .getChat({user,id})  

)}