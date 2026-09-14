import {Types , Schema} from "mongoose";
import { HydratedDocument } from "mongoose";
export interface Ichat {
    participants : Types.ObjectId[]
    //message:

    group?:string
    groupImage?:string
    roomId:string

    createdby:Types.ObjectId
    createdAt:Date
    updateAt:Date




}

export type Hchat = HydratedDocument <Ichat> ;