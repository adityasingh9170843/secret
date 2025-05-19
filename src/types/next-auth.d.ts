import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;
    createdAt?: Date;
  }
  interface Session {
    user: {
      _id?: string;
      username?: string;
      email?: string;
      password?: string;
      isVerified?: Boolean;
      isAcceptingMessages?: Boolean;
      messages?: Array<Message>;
      createdAt?: Date;
    } 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    isVerified?: Boolean;
    isAcceptingMessages?: Boolean;
    messages?: Array<Message>;
    createdAt?: Date;
  }
}