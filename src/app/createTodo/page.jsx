import Link from 'next/link';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <h1>운동 To-do</h1>
      <Link href="/createTodo/add">
        <Button variant="contained">
          운동 To-do 추가
        </Button>
      </Link>
    </>
  );
}