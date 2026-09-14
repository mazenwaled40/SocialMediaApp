import {Types , Schema} from "mongoose";
import { HydratedDocument } from "mongoose";
 export interface Imessage{
    createdby:Types.ObjectId,
    content:string,
    attachment:string[];
    createdAt:Date,
    updatedAt:Date,
}

export type Hmessage = HydratedDocument<Imessage>