/* eslint-disable no-console */

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log('POST 요청 받았어요');
    const body = await req.json();

    // 해당 이메일이 db에 있는지 체크하기
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // 이미 가입된 이메일
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 가입된 이메일입니다.' },
        { status: 409 },
      );
    }

    // 사용 가능한 이메일인 경우
    const hashedPassword = await hash(body.password, 12);
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        nickname: body.nickname,
      },
    });

    // 성공시 response
    return NextResponse.json({ msg: 'User 생성됨', user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러' });
  } finally {
    await prisma.$disconnect();
  }
}
