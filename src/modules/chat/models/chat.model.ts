import { model, Schema, Types } from "mongoose";
import { Ichat } from "../types/chat.type";
import { Imessage } from "../types/message.type";

const messageSchema = new Schema<Imessage>(
  {
    attachment: {
      type: [String],
    },
    content: {
      type: String,
      required: function (this: Imessage) {
        return this.attachment.length === 0;
      },
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);


const chatSchema = new Schema<Ichat>(
  {
   participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    messages: [messageSchema],
    group: String,
    groupImage: String,
    roomId: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);
export const chatmodel = model<Ichat>("Chat", chatSchema);