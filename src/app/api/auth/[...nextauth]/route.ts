import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter( prisma ),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID?? '',
      clientSecret: process.env.GOOGLE_SECRET?? '',
    })
  ]
}

const handler = NextAuth( authOptions );
export { handler as GET, handler as POST };