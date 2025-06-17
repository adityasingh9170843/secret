import { Message } from "@/model/User";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";







export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const username = session?.user.username
    
    if(!username){
        return Response.json(
            {
                success: false,
                message: "You must be logged in to access.",
            },
            {
                status: 500,
            }
        );
    }

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
        
        const messageCount = user.message.length;
        
 
        return Response.json(
            {
                success: true,
                message: "Message count fetched successfully.",
                messageCount,
            },
            {
                status: 200,
            }
        );
    }catch(e){
        return Response.json(
            {
                success: false,
                message: "Failed to fetch message count.",
            },
            {
                status: 500,
            }
        );
    }



}