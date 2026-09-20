import{Socket} from "socket.io";
import {chatEvent} from "./chat.event";

class gateway{
    register(socket:Socket){
        chatEvent.sendMessage(socket)
        chatEvent.joinGroup(socket)
    }
}