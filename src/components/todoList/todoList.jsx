import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import TodoItem from './todoItem';

export default function TodoList({ date }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/todo?date=${date}&reqType=d`)
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  }, [date]);

  return (
    <Box>
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </Box>
  );
}
