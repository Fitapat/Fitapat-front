/*app/items/route.ts*/
import { NextResponse } from 'next/server';

export async function GET() {
  // const res = await fetch('<https://data.mongodb-api.com/>...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();

  const workouts = EXAMPLE_WORKOUTS;

  return NextResponse.json(workouts);
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
      intensity: '30kg',
      time: 10,
    },
    {
      intensity: '40kg',
      time: 8,
    },
    {
      intensity: '50kg',
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
      intensity: '30kg',
      time: 10,
    },
    {
      intensity: '40kg',
      time: 8,
    },
    {
      intensity: '50kg',
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
      intensity: '6km/h',
      time: 10,
    },
    {
      intensity: '7km/h',
      time: 8,
    },
    {
      intensity: '8km/h',
      time: 6,
    },
  ],
};

const EXAMPLE_WORKOUTS = [EXAMPLE_WORKOUT1, EXAMPLE_WORKOUT2, EXAMPLE_WORKOUT3];
