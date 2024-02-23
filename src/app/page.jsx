'use client';

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import MuiCalendar from '../components/calendar/muiCalendar';
import TodoItem from '../components/getTodo/todoItem';
import CreateTodoBtn from '../components/createTodo/createTodoBtn';
import CreateTodoDrawer from '../components/createTodo/createTodoDrawer';

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <MuiCalendar />
      <TodoItem />
      <TodoItem />
      <CreateTodoBtn toggleDrawer={toggleDrawer} />
      <CreateTodoDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
