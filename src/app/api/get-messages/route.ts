import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
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

  const user = session.user;

  console.log("Session user ID:", session.user._id);
  console.log("Session user:", session.user);
  const userID = new mongoose.Types.ObjectId(user._id);

  console.log("userID", userID);
  try {
    const foundUser = await UserModel.findById(userID)
      .select("message") // Only select messages
      .sort({ "message.createdAt": -1 }); // Sort messages
    console.log("foundUser", foundUser);
    if (!foundUser) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: foundUser.message }, // Return sorted messages
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Error fetching messages", success: false },
      { status: 500 }
    );
  }
}
