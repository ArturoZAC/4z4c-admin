import { signInEmailPassword } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Correo Electronico", type: 'email', placeholder: 'usuario@gmail.com'},
        password: { label: "Contraseña", type: 'password', placeholder: '******'},
      },
      async authorize( credentials, req ){

        const user = await signInEmailPassword( credentials!.email, credentials!.password);

        if( user ){
          return user
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      return true;
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email'}});
      // console.log(dbUser);
      if( !dbUser?.isActive ){
        throw new Error('Usuario no esta activo');
      }
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      // console.log(token)
      return token;
    },

    async session({session, token, user}) {
      // console.log({ token });

      if( session && session.user ) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    }
  }
}

const handler = NextAuth( authOptions );
export { handler as GET, handler as POST };