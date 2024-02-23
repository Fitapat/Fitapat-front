/* eslint-disable no-console */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    // jwt로 토큰 인증
    const verified = jwt.verify(body.resetToken, process.env.JWT_KEY);
    // verified = {userId: ..., iat: ..., exp: ...}

    // 해당 userId를 가진 user를 db에서 가져오기
    const user = await prisma.user.findUnique({
      where: { id: verified.userId },
    });
    // console.log('user를 찾았습니다: ', user);

    if (!user) {
      return NextResponse.json(
        { error: '존재하지 않는 유저' },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: '기간이 만료된 토큰' },
        { status: 403 },
      );
    }
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { error: '유효하지 않은 토큰' },
        { status: 401 },
      );
    }
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
