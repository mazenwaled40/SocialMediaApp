import { model, Schema, Types } from "mongoose";
import { FriendRequestEnum, IFriendRequest } from "../types/friendRequest.types";
import { object } from "joi";

const friendRequestSchema = new Schema<IFriendRequest>({
    from: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    to: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: Number,
        default: FriendRequestEnum.pending
       

    }
}, {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

export const friendRequestModel = model<IFriendRequest>("FriendRequest", friendRequestSchema);