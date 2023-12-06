/*app/items/route.ts*/
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

// export async function GET() {
//   const workouts = await prisma.todo.findMany({ take: 10 });
//   return NextResponse.json(workouts);
// }

// 날짜를 매개변수로 입력받아, 입력된 날짜에 해당하는 데이터 리턴
export async function GET(request : NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");

    // 날짜가 주어지지 않았을 경우 에러 리턴
    if (!date) {
      return NextResponse.json({
        status: 400,
        body: 'Bad Request: Date parameter is missing',
      });
    }

    // Prisma를 사용하여 해당 날짜에 해당하는 Todo 데이터를 가져옴
    const todoData = await prisma.todo.findMany({
      // 입력된 날짜와 일치하는 데이터 검색
      where: {
        date: date,
      },
    });

    // JSON 형식으로 응답
    return NextResponse.json(todoData);
  } catch {
    // 에러가 발생하면 에러 상태를 반환
    return NextResponse.json({
      status: 500,
      body: 'Internal Server Error',
    });
  }
}

export async function POST() {
  // post
}

// 운동 예시 오브젝트
const EXAMPLE_WORKOUT1 = {
  user_id: '1',
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
  user_id: '1',
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
  user_id: '1',
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
