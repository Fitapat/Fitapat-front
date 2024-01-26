/* eslint-disable no-console */

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();

    // 해당 이메일이 db에 있는지 체크하기
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // 해당 이메일을 찾을 수 없음
    if (!existingUser) {
      return NextResponse.json(
        { error: '회원을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    // 이메일을 찾은 경우: 해당 이메일의 비밀번호를 변경한다
    const hashedPassword = await hash(body.password, 12);
    const res = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    // 성공시 response
    return NextResponse.json({ msg: '비밀번호 변경됨', result: res });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
