import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import TodoItem from './todoItem';
import todoAPI from '/src/apis/todoAPI';

export default function TodoList({ date }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoAPI
      .getTodo(date, 'd')
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
