import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export async function GET() {
  const workouts = await prisma.todo.findMany({ take: 10 });
  return NextResponse.json(workouts);
}

export async function POST() {
  // post
}

// 운동 예시 오브젝트
const EXAMPLE_WORKOUT1 = {
  _id: 'stringstring',
  userId: '1',
  title: '벤치프레스',
  date: '2021-10-10',
  aerobic: false,
  done: true,
  sets: [
    {
      intensity: 30,
      time: 10,
    },
    {
      intensity: 40,
      time: 8,
    },
    {
      intensity: 50,
      time: 6,
    },
  ],
};

const EXAMPLE_WORKOUT2 = {
  _id: 'dddd',
  userId: '1',
  title: '스쿼트',
  date: '2021-10-10',
  aerobic: false,
  done: true,
  sets: [
    {
      intensity: 30,
      time: 10,
    },
    {
      intensity: 40,
      time: 8,
    },
    {
      intensity: 50,
      time: 6,
    },
  ],
};

const EXAMPLE_WORKOUT3 = {
  _id: 'string3',
  userId: '1',
  title: '런닝머신',
  date: '2021-10-10',
  aerobic: true,
  done: true,
  sets: [
    {
      intensity: 6,
      time: 10,
    },
    {
      intensity: 7,
      time: 8,
    },
    {
      intensity: 8,
      time: 6,
    },
  ],
};

const EXAMPLE_WORKOUTS = [EXAMPLE_WORKOUT1, EXAMPLE_WORKOUT2, EXAMPLE_WORKOUT3];
