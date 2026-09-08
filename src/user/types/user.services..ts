import { friendRequestModel } from "../models/friendRequest.model";
import { FriendRequestEnum } from "../types/friendRequest.types";
import { userModel } from "../models/user.model";
import { Types } from "mongoose";
import { Huser } from "./user.types";

class userservices {
    async sendFriendRequest({ to, from }: { to: string; from: string }) {
        const isfriendrequestExist = await friendRequestModel.findOne({
            status: {
                $in: [FriendRequestEnum.accepted, FriendRequestEnum.pending]
            },
            $or: [
                { from, to },
                { from: to, to: from }
            ]
        });

        const reciever = await userModel.findById(to);
        if (!reciever) {
            throw new Error("not found");
        }

        await friendRequestModel.create({
            from,
            to,
        });
    }

    async friendRequestReplay({ id, status }: FriendRequestReplayData) {
        const FriendRequest = await friendRequestModel.findOne({ _id: id });
        if (!FriendRequest) {
            throw new Error("friend request not found");
        }

        if (FriendRequest.status !== FriendRequestEnum.pending) {
            throw new Error("friend request must be pending");
        }

        FriendRequest.status = status;
        await FriendRequest.save();

        return {
            data: {}
        };
    }

    async friendRequestList({ userId, isTo = true }: { userId: string | Types.ObjectId; isto?: boolean }) {
        const filter: {
            to?: string | Types.ObjectId;
            from?: string | Types.ObjectId;
            status: FriendRequestEnum;
        } = {
            to: userId,
            status: FriendRequestEnum.pending
        };

        if (isTo == false) {
            delete filter.to;
            filter.from = userId;
        }

        const friendRequest = await friendRequestModel.find(filter);
        return friendRequest;
    }

    async listFriend({ user }: { user: Huser }) {
        user = await user.populate([
            {
                path: "Recieved",
                select: "id from status", // 👈 ضفنا فاصلة هنا
                populate: [
                    {
                        path: "from",
                        select: "name email"
                    }
                ]
            }, 
            {
                path: "send",
                select: "id from status", // 👈 ضفنا فاصلة هنا
                populate: [
                    {
                        path: "to",
                        select: "name email"
                    }
                ]
            }
        ]); 

        return user;
    }
     
export const UserServices = new userservices();
