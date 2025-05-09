import mongoose, { Schema,Document } from "mongoose";


export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema ({
    content:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})


export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    message:Message[];
}

const UserSChema: Schema<User> = new Schema ({
   username:{
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        match:[/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    verifyCode: {
        type: String,
        required: [true, "Please enter a code"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Please enter a code expiry"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    message:{
        type: [MessageSchema],
        default: [],
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSChema ) 

export default UserModel