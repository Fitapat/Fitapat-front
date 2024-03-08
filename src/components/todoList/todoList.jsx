import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import TodoItem from './todoItem';

export default function TodoList({ date }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/todo?date=${date.format(
        'YYYY-MM-DD',
      )}&reqType=d`,
    )
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  }, [date]);

  return (
    <Box>
      {todoList.length
        ? todoList.map((item) => <TodoItem key={item.id} item={item} />)
        : null}
    </Box>
  );
}
