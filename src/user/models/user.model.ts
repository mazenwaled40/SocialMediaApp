import { model, Schema } from "mongoose";
import { IUser, GenderEnum, ProviderEnum, RoleEnum } from "./user.types";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    isOnline: { 
        type: Boolean, 
        default: false 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    gender: { 
        type: String, 
        enum: Object.values(GenderEnum),
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    bio: {
        type:String
    },
    confirmedAt: { 
        type: Date 
    },
    changedCredentialsAt: { 
        type: Date 
    },
    provider: { 
        type: String, 
        enum: Object.values(ProviderEnum), 
        default: ProviderEnum.system 
    },
    role: { 
        type: String, 
        enum: Object.values(RoleEnum), 
        default: RoleEnum.user 
    },
    profilePic: { 
        type: String 
    }
}, {
    timestamps: true 
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.virtual("recieved",{
    localField: "_id",
    forignField: "to",
    ref: "FriendRequest",
    match: {status:FriendRequestEnum.accepted}
})
UserSchema.virtual("to",{
    localField: "_id",
    forignField: "from",
    ref: "FriendRequest",
    match: {status:FriendRequestEnum.accepted}
})



export const userModel = model<IUser>("User", UserSchema);
export default userModel;