import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient({});

// 날짜를 매개변수로 입력받아, 입력된 날짜에 해당하는 데이터 리턴
export async function GET(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions);

  console.log('세션: ', session);

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'No authorization',
    });
  }

  // console.log('server session', session);
  /*
  server session {
  user: { name: undefined, email: 'test@test.test', image: undefined }
  }
 */

  try {
    const dateString = request.nextUrl.searchParams.get('date'); // 2002-08-09
    const date = new Date(dateString);
    // console.log('date', dateString, date);
    const reqType = request.nextUrl.searchParams.get('reqType'); // 'm' | 'd'

    // 날짜가 주어지지 않았을 경우 에러 리턴
    if (!dateString) {
      return NextResponse.json({
        status: 400,
        body: 'Bad Request: Date parameter is missing',
      });
    }

    if (reqType === 'm') {
      // 해당 날짜 앞뒤로 1달씩 todo 리스트 가져옴
      const startDate = new Date(date.setMonth(date.getMonth() - 1));
      const endDate = new Date(date.setMonth(date.getMonth() + 2));
      // console.log(startDate, endDate);
      const todoDataList = await prisma.todo.findMany({
        where: {
          date: {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
          },
        },
      });
      return NextResponse.json(todoDataList);
    } else if (reqType === 'd') {
      // 해당 날짜에 해당하는 Todo 데이터를 가져옴
      const todoData = await prisma.todo.findMany({
        where: {
          date: date.toISOString(),
        },
      });
      return NextResponse.json(todoData);
    } else {
      // reqType 오류
      return NextResponse.json({
        status: 400,
        body: 'Bad Request: reqType parameter is wrong',
      });
    }
  } catch (error) {
    console.error('Error in GET function:', error);

    // 에러가 발생하면 에러 상태를 반환
    return NextResponse.json({
      status: 500,
      body: `Internal Server Error: ${error.message}`,
    });
  }
}

// todo 생성
export async function POST(request: NextRequest) {
  try {
    // 클라이언트에서 전달된 데이터 파싱
    const { userId, title, date, aerobic, done, sets } = await request.json();
    const date_ = new Date(date);

    // 유저 정보 확인
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // 유저가 존재하지 않을 경우 에러 반환
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: 'User not found',
      });
    }

    // 새로운 todo 생성
    const newTodo = await prisma.todo.create({
      data: {
        userId: userId,
        title: title,
        date: date_.toISOString(),
        aerobic: aerobic,
        done: done,
        sets: {
          create: sets.map((set) => ({
            intensity: set.intensity,
            time: set.time,
          })),
        },
      },
    });

    // 생성된 todo 정보 반환
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error('Error in POST function:', error);

    // 에러가 발생하면 에러 상태를 반환
    return NextResponse.json({
      status: 500,
      body: `Internal Server Error: ${error.message}`,
    });
  }
}

// todo 편집
export async function PUT(request: NextRequest) {
  try {
    // 요청에서 todo id를 가져옴
    const todoId = request.nextUrl.searchParams.get('id');

    // todo id가 주어지지 않았을 경우 에러 반환
    if (!todoId) {
      return NextResponse.json({
        status: 400,
        body: 'Bad Request: Todo ID parameter is missing',
      });
    }

    // 클라이언트에서 전달된 데이터 파싱
    const { userId, title, date, aerobic, done, sets } = await request.json();
    const date_ = new Date(date);

    // 유저 정보 확인
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // 유저가 존재하지 않을 경우 에러 반환
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: 'User not found',
      });
    }

    // todo 정보 확인
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    // todo가 존재하지 않을 경우 에러 반환
    if (!todo) {
      return NextResponse.json({
        status: 404,
        body: 'Todo not found',
      });
    }

    // 요청한 유저와 todo의 유저가 다를 경우 에러 반환
    if (todo.userId !== userId) {
      return NextResponse.json({
        status: 403,
        body: 'Forbidden: You do not have permission to edit this todo',
      });
    }

    // todo 업데이트
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: title,
        date: date_.toISOString(),
        aerobic: aerobic,
        done: done,
        sets: {
          // sets 필드 업데이트
          deleteMany: {}, // 기존의 sets 삭제
          create: sets.map((set) => ({
            intensity: set.intensity,
            time: set.time,
          })),
        },
      },
    });

    // 업데이트된 todo 정보 반환
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error in PUT function:', error);

    // 에러가 발생하면 에러 상태를 반환
    return NextResponse.json({
      status: 500,
      body: `Internal Server Error: ${error.message}`,
    });
  }
}

// todo 삭제
export async function DELETE(request: NextRequest) {
  try {
    // 요청에서 todo id를 가져옴
    const todoId = request.nextUrl.searchParams.get('id');

    // todo id가 주어지지 않았을 경우 에러 반환
    if (!todoId) {
      return NextResponse.json({
        status: 400,
        body: 'Bad Request: Todo ID parameter is missing',
      });
    }

    // 클라이언트에서 전달된 데이터 파싱
    const { userId } = await request.json();

    // 유저 정보 확인
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // 유저가 존재하지 않을 경우 에러 반환
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: 'User not found',
      });
    }

    // todo 정보 확인
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    // todo가 존재하지 않을 경우 에러 반환
    if (!todo) {
      return NextResponse.json({
        status: 404,
        body: 'Todo not found',
      });
    }

    // 요청한 유저와 todo의 유저가 다를 경우 에러 반환
    if (todo.userId !== userId) {
      return NextResponse.json({
        status: 403,
        body: 'Forbidden: You do not have permission to delete this todo',
      });
    }

    // todo에 연결된 모든 Set 삭제
    await prisma.set.deleteMany({
      where: {
        todoId: todoId,
      },
    });

    // todo 삭제
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    // 삭제 성공 메시지 반환
    return NextResponse.json({
      status: 200,
      body: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE function:', error);

    // 에러가 발생하면 에러 상태를 반환
    return NextResponse.json({
      status: 500,
      body: `Internal Server Error: ${error.message}`,
    });
  }
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
