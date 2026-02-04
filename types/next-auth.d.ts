import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string;
    isVerified?: boolean;
    token?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email?: string;
      name?: string;
      role?: string;
      isVerified?: boolean;
      token?: string;
      phone?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
    role?: string;
    isVerified?: boolean;
    token?: string;
    phone?: string;
  }
}
