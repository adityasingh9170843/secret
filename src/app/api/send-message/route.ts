import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import { Message } from "@/model/User";
import { log } from "console";

export async function POST(request: Request) {
    await dbConnect();
   const {username,content} =  await request.json();
   try{
    const user = await UserModel.findOne({username})
    if(!user){
        return Response.json(
            {
                success: false,
                message: "User not found.",
            },
            {
                status: 404,
            }
        );
    }

    if(user.isAcceptingMessages === false){
        return Response.json(
            {
                success: false,
                message: "User is not accepting messages.",
            },
            {
                status: 403,
            }
        );
    }
    const newMessage = {content,createdAt: new Date()}
    user.message.push(newMessage as Message);
    await user.save();
    return Response.json(
        {
            success: true,
            message: "Message sent successfully.",
        },
        {
            status: 200,
        }
    );
   }catch(e){
    return Response.json(
        {
            success: false,
            message: "Failed to send message.",
        },
        {
            status: 500,
        }
    );
   }
    
}