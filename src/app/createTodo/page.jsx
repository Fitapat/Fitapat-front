'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Global } from '@emotion/react';
import Typography from '@mui/material/Typography';
import CreateTodoDrawer from './createTodoDrawer';

export const drawerBleeding = 56;

function CreateTodoBtn({ toggleDrawer }) {
  return (
    <Button
      variant="contained"
      fullWidth={true}
      onClick={() => toggleDrawer(true)}
    >
      운동 To-do 추가
    </Button>
  );
}

function CreateTodo() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <CreateTodoBtn toggleDrawer={toggleDrawer} />
      <CreateTodoDrawer open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default CreateTodo;
