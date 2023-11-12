import React from 'react';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';

export default function AddTodo() {
  return (
    <>
      <h1>Add Todo</h1>
      <form>
        <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>
          추가하기
        </Button>
      </form>
      <br />
      <Link href="/createTodo">
        <Button variant="outlined">
          뒤로 가기
        </Button>
      </Link>
    </>
  );
}
