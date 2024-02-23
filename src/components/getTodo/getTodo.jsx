import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import TodoItem from './todoItem';

export default function GetTodo({ date, reqType }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/todo?date=${date}&reqType=${reqType}`)
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  }, [date, reqType]);

  return (
    <Box>
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </Box>
  );
}
