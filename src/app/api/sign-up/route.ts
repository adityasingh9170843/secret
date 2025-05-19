import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json()
    const existingUserVerifiedByUsername = await UserModel.findOne({ username,isVerified:true})
    if(existingUserVerifiedByUsername){
      return Response.json(
        { success: "false", message: "Username already exists" },
        { status: 400 }
      );
    }
    const existingUserVerifiedByEmail = await UserModel.findOne({email})
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    if(existingUserVerifiedByEmail){
        if(existingUserVerifiedByEmail.isVerified){
            return Response.json(
                { success: "false", message: "Email already exists" },
                { status: 400 }
            );
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setDate(expiryDate.getDate() + 1)
           existingUserVerifiedByEmail.password = hashedPassword
           existingUserVerifiedByEmail.verifyCode = verifyCode
           existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now()+ 36000000)
           await existingUserVerifiedByEmail.save()
        }
    }
    else{
       const hashedPassword = await bcrypt.hash(password,10)
       const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 1)
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            isVerified: false,
            isAcceptingMessages: true,
            verifyCodeExpiry: expiryDate,
            messages: [],
        })
        await newUser.save()
    }
    // Send verfication emaill
    const emailResponse = await sendVerificationEmail(email,username, verifyCode);
    if(!emailResponse.success) {
      return Response.json(
        { success: "false", message: emailResponse.message },
        { status: 500 }
      );
    }
    else{
        return Response.json(
            { success: "true", message: "User created successfully" },
            { status: 200 }
        );
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return Response.json(
      { success: "false", message: "Error connecting to the database" },
      { status: 500 }
    );
  }
}
