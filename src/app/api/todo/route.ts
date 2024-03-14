import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient({});

// 날짜를 매개변수로 입력받아, 입력된 날짜에 해당하는 데이터 리턴
export async function GET(request: NextRequest, response: NextResponse) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'No authorization',
    });
  }

  try {
    const dateString = request.nextUrl.searchParams.get('date'); // 2002-08-09
    const date = new Date(dateString);
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
      const todoDataList = await prisma.todo.findMany({
        where: {
          user: { email: session.user.email },
          date: {
            gte: new Date(startDate.toISOString().replace('Z', '')),
            lt: new Date(endDate.toISOString().replace('Z', '')),
          },
        },
        include: {
          sets: true,
        },
      });
      return NextResponse.json(todoDataList);
    } else if (reqType === 'd') {
      // 해당 날짜에 해당하는 Todo 데이터를 가져옴
      const startDate = new Date(dateString);
      const endDate = new Date(date.setDate(date.getDate() + 1)); // 다음날 00시00분00초 데이터 까지 가져오기
      const todoDataList = await prisma.todo.findMany({
        where: {
          user: { email: session.user.email },
          date: {
            gte: new Date(startDate.toISOString().replace('Z', '')),
            lt: new Date(endDate.toISOString().replace('Z', '')),
          },
        },
        include: {
          sets: true,
        },
      });
      return NextResponse.json(todoDataList);
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
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'No authorization',
    });
  }

  try {
    // 클라이언트에서 전달된 데이터 파싱
    const { title, aerobic, sets, date } = await request.json();

    // 유저 정보 확인
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
        userId: user.id,
        title: title,
        date: new Date(date).toISOString(),
        done: false,
        sets: {
          create: sets.map((set) => ({
            intensity: set.intensity,
            time: set.time,
          })),
        },
        aerobic: aerobic,
      },
      include: {
        sets: true,
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
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'No authorization',
    });
  }

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
      include: {
        sets: true,
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
  const session = await getServerSession();

  // console.log('delete todo 세션: ', session);

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'No authorization',
    });
  }

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

    // 유저 정보 확인
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
    if (todo.userId !== user.id) {
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
