import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import MuiCalendar from '../components/calendar/muiCalendar';
import TodoItem from '../components/todo/todoItem';

export default function Home() {
  return (
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <MuiCalendar />
      <TodoItem />
      <TodoItem />
    </Box>
  );
}
