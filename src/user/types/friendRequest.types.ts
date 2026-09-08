import { Types, ObjectId, HydratedDocument } from "mongoose";

export enum FriendRequestEnum {
    pending,
    accepted,
    rejected,
    cancelled
}

export interface IFriendRequest {
    from: Types.ObjectId;
    to: Types.ObjectId;
    status: FriendRequestEnum;
}

export type HfriendRequest = HydratedDocument<IFriendRequest>;