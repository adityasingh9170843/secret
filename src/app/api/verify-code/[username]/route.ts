import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export async function POST(request:Request){
    await dbConnect();
    try{
        const {username,code} = await request.json();
        
        console.log("username",username,"code",code);
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success : false,
                message : "User not found",
            },
        {
                status: 404,
        })
        }
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success : true,
                message : "User verified successfully",
                
            },
        {
                status: 200,
        })
        }
        else{
            return Response.json({
                success : false,
                message : "verification code has expired, please try again",
            },
        {
            status: 400,    
        })
        }
    }
    catch(error){
        console.log("Error verifying user",error);
        return Response.json({
            success : false,
            message : "Error verifying user",
        },
    {
            status: 500,
    })
    }
}
