import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";





export async function DELETE(
  
  request: NextRequest,
  
) {
  await dbConnect();

  const pathSegments = request.nextUrl.pathname.split('/');
  const messageID = pathSegments[pathSegments.length - 1];

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to access.",
      },
      { status: 401 }
    );
  }

  const user = session.user;

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { message: { _id: messageID } } }
    );

    if (updatedResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete message or message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      { status: 500 }
    );
  }
}
