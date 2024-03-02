/* eslint-disable no-console */

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    // body = { email: '...', password: '...' }

    // 해당 이메일이 db에 있는지 체크하기
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // 존재하지 않는 계정
    if (!existingUser) {
      console.log('존재하지 않는 계정');
      return NextResponse.json(
        { error: '존재하지 않는 계정' },
        { status: 404 },
      );
    }

    const isCorrectPassword = await bcrypt.compare(
      body.password,
      existingUser.password,
    );

    if (!isCorrectPassword) {
      console.log('비밀번호 불일치');
      return NextResponse.json({ error: '비밀번호 불일치' }, { status: 401 });
    }

    // 비밃번호가 일치하면 회원탈퇴 진행
    const deleteUser = await prisma.user.delete({
      where: {
        email: existingUser.email,
      },
    });

    // 성공시 response
    return NextResponse.json({ msg: '회원탈퇴 완료', user: deleteUser });
  } catch (error) {
    console.error('에러: ', error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
