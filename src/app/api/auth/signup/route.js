import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export async function POST() {
  // const response = await prisma.user.create({
  //   data: { email: 'hh@hh.hh', password: 'hh', nickname: 'hh' },
  // });
  // console.log(response);
}
