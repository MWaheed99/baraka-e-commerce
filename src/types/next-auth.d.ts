import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token: string;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
} 