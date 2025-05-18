import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    data?: any;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;
}