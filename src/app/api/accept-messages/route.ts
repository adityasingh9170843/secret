import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
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

  const userID = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        isAcceptingMessages: acceptMessages,
      },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user status",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update user status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status",
      },
      {
        status: 500,
      }
    );
  }
}

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

  const userID = user._id;
  try{
    const foundUser = await UserModel.findById(userID);
  if (!foundUser) {
    return Response.json(
      {
        success: false,
        message: "Failed to find user",
      },
      {
        status: 401,
      }
    );
  }
  return Response.json(
    {
      success: true,
      message: "User status fetched successfully",
      isAcceptingMessages: foundUser.isAcceptingMessages,
    },
    {
      status: 200,
    }
  );
  }catch(error){
    console.log("failed to fetch user status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch user status",
      },
      {
        status: 500,
      }
    );
  }
  
}
