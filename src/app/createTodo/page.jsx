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
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible',
            width: '100%',
            maxWidth: '430px',
            margin: '0 auto',
          },
        }}
      />
      <Box>
        <Typography variant="h4" sx={{ my: 2 }}>
          운동 To-do 생성
        </Typography>
        <CreateTodoBtn toggleDrawer={toggleDrawer} />
      </Box>
      <CreateTodoDrawer open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default CreateTodo;
