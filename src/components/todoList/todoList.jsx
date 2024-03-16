import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import TodoItem from './todoItem';
import todoAPI from '/src/apis/todoAPI';

export default function TodoList({
  date,
  toggleDrawer,
  setDrawerType,
  setTodoItem,
}) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoAPI
      .getTodo(date, 'd')
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  });

  return (
    <Box>
      {todoList.length
        ? todoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              toggleDrawer={toggleDrawer}
              setDrawerType={setDrawerType}
              setTodoItem={setTodoItem}
            />
          ))
        : null}
    </Box>
  );
}
