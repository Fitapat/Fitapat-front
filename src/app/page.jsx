'use client';

import { useState } from 'react';
import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import MuiCalendar from '../components/calendar/muiCalendar';
import TodoList from '../components/todoList/todoList';
import CreateTodoBtn from '../components/createTodo/createTodoBtn';
import CreateTodoDrawer from '../components/createTodo/createTodoDrawer';

export default function Home() {
  const [value, setValue] = useState(dayjs());
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <MuiCalendar value={value} setValue={setValue} />
      <TodoList date={value} />
      <CreateTodoBtn toggleDrawer={toggleDrawer} />
      <CreateTodoDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
