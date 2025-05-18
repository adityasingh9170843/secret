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
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return Response.json(
      { success: "false", message: "Error connecting to the database" },
      { status: 500 }
    );
  }
}
