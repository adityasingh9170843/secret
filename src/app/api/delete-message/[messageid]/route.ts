import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
;


export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  await dbConnect();
  const messageID = params.messageid;
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
  const user = session?.user;
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageID } } }
    );
    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Failed to delete message or message not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error deleting message:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      {
        status: 500,
      }
    );
  }
}
