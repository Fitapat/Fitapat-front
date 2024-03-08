/* eslint-disable no-console */

import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
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
          where: {
            email: credentials.email,
          },
          // include: {
          //   todos: true, // 해당 사용자의 todo 목록을 가져옴
          // },
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

        // 비밀번호가 일치하면 진행
        const { email, nickname } = existingUser;

        // 결과 만들어서 반환
        const user = {
          email,
          nickname,
        };
        console.log('authorized: ', user);
        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1시간
  },

  // NextAuth의 콜백: authorize 함수가 실행된 후 마지막으로 실행됨
  callbacks: {
    // jwt 생성될 때 실행되는 콜백
    jwt: ({ token, user }) => {
      if (user) {
        token.user = { ...user };
        console.log('JWT callback, ', token);
      }
      return token;
    },
    // 세션이 조회될 때 실행되는 콜백
    session: ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
        console.log('session callback, ', session);
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export default handler;
