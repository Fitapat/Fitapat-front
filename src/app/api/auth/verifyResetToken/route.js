/* eslint-disable no-console */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log('body: ', body);

    // jwt로 토큰 인증
    const verified = jwt.verify(body.resetToken, process.env.NEXTAUTH_SECRET);
    // console.log('verified: ', verified);
    // verified = {userId: ..., iat: ..., exp: ...}

    // 해당 userId를 가진 user를 db에서 가져오기
    const user = await prisma.user.findUnique({
      where: { id: verified.userId },
    });
    console.log('user를 찾았습니다: ', user.email);
    // console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    if (error === 'TokenExpiredError')
      return NextResponse.json({ ok: false, error: '토큰 유효기간 만료' });
    return NextResponse.json({ ok: false, error: '서버 에러' });
  } finally {
    await prisma.$disconnect();
  }
}
