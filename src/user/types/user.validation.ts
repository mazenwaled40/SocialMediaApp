import z from "zod";
import { isValidObjectId } from "mongoose";
import { friendRequestModel } from "../models/friendRequest.model";
import { IFriendRequest, FriendRequestEnum } from "../types/friendRequest.types";

export const sendFriendRequestSchema = {
    body: z.strictObject({
        to: z.string().refine((value) => {
            return isValidObjectId(value);
        }, {
            message: "invalid id value"
        })
    })
};

export type sendFriendRequestData = z.infer<typeof sendFriendRequestSchema.body>;

export const friendRequestReplaySchema = {
    body: z.strictObject({
        status: z.union([
            z.literal(FriendRequestEnum.accepted),
            z.literal(FriendRequestEnum.rejected)
        ])
    }),
    params: z.strictObject({
        id: z.string().refine((value) => {
            return isValidObjectId(value);
        }, {
            message: "invalid id value"
        })
    })
};

export type friendRequestRepalyData = z.infer<typeof friendRequestReplaySchema.body> &
    z.infer<typeof friendRequestReplaySchema.params>;

export const cancelFriendRequest = {
    params: z.strictObject({
        id: z.string().refine((value) => {
            return isValidObjectId(value);
        }, {
            message: "invalid id value"
        })
    })
};

export type cancelFriendRequestData = z.infer<typeof cancelFriendRequest.params>;