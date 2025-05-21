import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User"; 
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const checkUsernameUniqueSchema = z.object({
    username: usernameValidation,
})

export async function GET(request: Request) {
    await dbConnect();

    try{
        const {searchParams} = new URL(request.url);
        const queryparam = {
            username : searchParams.get("username"),
        }
        const result =checkUsernameUniqueSchema.safeParse(queryparam);
        console.log("result",result);
        if(!result.success){
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success : false,
                message : usernameError[0] || "Invalid username",
            },{
                status: 400
            })
        }

        const {username} = result.data;
        const existingVerifiedUser = await UserModel.findOne({username,isVerified:true});
        if(existingVerifiedUser){
            return Response.json({
                success : false,
                message : "Username already taken",
            },{
                status: 409
            })
        }
        return Response.json({
            success : true,
            message : "Username available",
        })
    }
    catch(error){
        console.log("error checking username",error);
        return Response.json({
            success : false,
            message : "Error checking username",
        },
    {
            status: 500,
    })
    }
}