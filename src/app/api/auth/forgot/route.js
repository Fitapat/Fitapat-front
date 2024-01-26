/* eslint-disable no-console */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    // body = {email: '...'}

    // 해당 이메일이 db에 있는지 체크하기
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // 가입되지 않은 이메일
    if (!existingUser) {
      console.log('가입되지 않은 이메일');
      return NextResponse.json(
        { error: '가입되지 않은 이메일' },
        { status: 404 },
      );
    }

    // 가입된 이메일인 경우 메일을 보낸다
    console.log('가입된 이메일. 이메일을 보냅니다');
    const { emailService, user, pass } = process.env;
    // console.log(`${emailService}, ${user}, ${pass}`);
    const transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user,
        pass,
      },
    });

    // jwt로 토큰 만들기
    const userToken = jwt.sign(
      { userId: existingUser.id },
      process.env.NEXTAUTH_SECRET,
      {
        expiresIn: '1h',
      },
    );

    const url = `${process.env.NEXTAUTH_URL}/reset/${userToken}`;
    // console.log(url);

    const mailOptions = {
      from: user,
      to: body.email,
      subject: '[Fitapat] 비밀번호 재설정 인증 메일',
      html: `<span>안녕하세요, ${existingUser.nickname}님.</span><br/><span>아래의 링크를 클릭하여 비밀번호를 재설정할 수 있는 화면으로 이동합니다.</span><br/><a href=${url}>비밀번호 재설정하기</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('이메일 전송 완료: ', info);
      }
    });

    // 성공시 response
    return NextResponse.json({ msg: '이메일 전송됨' });
  } catch (error) {
    console.error('에러: ', error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
