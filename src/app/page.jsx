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
  let [drawerType, setDrawerType] = useState(0); // 0: 생성 / 1: 편집
  const [todoItem, setTodoItem] = useState({});

  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <MuiCalendar value={value} setValue={setValue} />
      <TodoList
        date={value}
        toggleDrawer={toggleDrawer}
        setDrawerType={setDrawerType}
        setTodoItem={setTodoItem}
      />
      <CreateTodoBtn
        toggleDrawer={toggleDrawer}
        setDrawerType={setDrawerType}
      />
      <CreateTodoDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        drawerType={drawerType}
        date={value}
        item={todoItem}
      />
    </Box>
  );
}
