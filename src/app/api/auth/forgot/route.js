/* eslint-disable no-console */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    // 해당 이메일이 db에 있는지 체크하기
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // 가입되지 않은 이메일
    if (!existingUser) {
      console.log('가입되지 않은 이메일');
      return NextResponse.json({ ok: false, error: '가입되지 않은 이메일' });
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
    console.log(existingUser.id);
    const userToken = jwt.sign(
      { userId: existingUser.id },
      process.env.NEXTAUTH_SECRET,
      {
        expiresIn: '1h',
      },
    );
    // console.log(userToken);
    const url = `${process.env.NEXTAUTH_URL}/reset/${userToken}`;
    console.log(url);

    const mailOptions = {
      from: user,
      to: body.email,
      subject: 'Fitapat 비밀번호 변경 메일(테스트)',
      html: `<span>아래의 링크로 접속하여 비밀번호를 변경해주시기 바랍니다.</span><br/><a href=${url}>비밀번호 변경</a>`,
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
    console.error(error);
    return NextResponse.json({ ok: false, error: '서버 에러' });
  } finally {
    await prisma.$disconnect();
  }
}
