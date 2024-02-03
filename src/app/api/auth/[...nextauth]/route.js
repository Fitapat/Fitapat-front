/* eslint-disable no-console */

import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      // signin
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.log('authorize is null');
          return null;
        }
        // Prisma를 사용하여 유저 정보를 가져옴
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        if (!isCorrectPassword) {
          return null;
        }

        // 비밀번호가 일치하면 jwt 토큰 생성
        const accessToken = jwt.sign(
          { userId: existingUser.id },
          process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );

        // 결과 만들어서 반환
        const user = {
          email: existingUser.email,
          accessToken,
        };
        // console.log('authorized user: ', user);
        return user;
      },
    }),
  ],

  // callbacks: {
  // session: ({ session, token }) =>
  //   // console.log('session callback', { session, token });
  //   ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: token.id,
  //       randomKey: token.randomKey,
  //     },
  //   }),
  // jwt: ({ token, user }) => {
  //   // console.log('JWT callback', { token, user });
  //   if (user) {
  //     const u = user;
  //     return {
  //       ...token,
  //       id: u.id,
  //       randomKey: u.randomKey,
  //     };
  //   }
  //   return token;
  // },

  // NextAuth의 콜백: authorize 함수가 실행된 후 마지막으로 실행됨
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback', { token, user });
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      console.log('session callback', { session, token });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
