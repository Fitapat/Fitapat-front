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
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          },
        );

        // 결과 만들어서 반환
        const user = {
          email: existingUser.email,
          nickname: existingUser.nickname,
          accessToken,
        };
        console.log('authorized: ', user);
        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  // NextAuth의 콜백: authorize 함수가 실행된 후 마지막으로 실행됨
  callbacks: {
    // jwt 생성될 때 실행되는 콜백
    jwt: ({ token, user }) => {
      if (user) {
        const j = {
          ...token,
          nickname: user.nickname,
          accessToken: user.accessToken,
        };
        console.log('JWT callback, ', j);
        return j;
      }
      return token;
    },
    // 세션이 조회될 때 실행되는 콜백
    session: ({ session, token }) => {
      const s = {
        ...session,
        nickname: token.nickname,
        accessToken: token.accessToken,
      };
      console.log('session callback, ', s);
      return s;
    },

    // session: ({ session, token }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: token.id,
    //     randomKey: token.randomKey,
    //   },
    // }),

    // console.log('session callback', { session, token });

    // session.user = token.user;
    // console.log('session callback, session: ', session);
    // return session;
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
