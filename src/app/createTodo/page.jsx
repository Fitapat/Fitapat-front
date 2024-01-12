'use client';

import { use, useState } from 'react';
import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const drawerBleeding = 56;

// 서랍창 상단 작은 막대기
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'white',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function TodoSet({ id, index, isAerobic, onDeleteSet }) {
  return (
    <Box
      sx={{
        backgroundColor: 'grey',
        borderRadius: 2,
        marginBottom: '20px',
      }}
    >
      {index} Set
      <TextField
        variant="outlined"
        type="number"
        size="small"
        margin="dense"
        sx={{ width: '20%', backgroundColor: 'white', borderRadius: 2 }}
      ></TextField>
      {isAerobic ? 'km' : 'kg'}
      <TextField
        variant="outlined"
        type="number"
        size="small"
        margin="dense"
        sx={{ width: '20%', backgroundColor: 'white', borderRadius: 2 }}
      ></TextField>
      {isAerobic ? '분' : '회'}
      <IconButton aria-label="delete set" onClick={() => onDeleteSet(id)}>
        <CloseIcon htmlColor="black" />
      </IconButton>
    </Box>
  );
}

function CreateTodoBtn({ toggleDrawer }) {
  return (
    <Button variant="contained" fullWidth={true} onClick={toggleDrawer(true)}>
      운동 To-do 추가
    </Button>
  );
}

function FinishCreateTodoBtn({ toggleDrawer }) {
  return (
    <Button
      variant="text"
      sx={{ p: 2, left: 'calc(100% - 70px)' }}
      onClick={toggleDrawer(false)}
    >
      완료
    </Button>
  );
}

function AerobicSwitch({ isAerobic, setIsAerobic }) {
  const handleAerobic = (event) => {
    setIsAerobic(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label={isAerobic ? '유산소' : '무산소'}
      onChange={handleAerobic}
    />
  );
}

function CreateTodoDrawer({ open, toggleDrawer }) {
  const [isAerobic, setIsAerobic] = useState(true);
  const [nextId, setNextId] = useState(2);
  const [setList, setSetList] = useState([{ id: 'set-1', load: 0, time: 0 }]);

  const addSet = () => {
    setNextId(nextId + 1);
    let newSetList = setList.slice();
    newSetList.push({ id: 'set-' + nextId, load: 0, time: 0 });
    setSetList(newSetList);
  };

  const handleDeleteSet = (id) => {
    for (let i = 0; i < setList.length; i++) console.log(setList[i].id === id);
    let newSetList = setList.filter((set) => set.id !== id);
    setSetList(newSetList);
  };

  let todoSets = [];
  for (let i = 0; i < setList.length; i++) {
    todoSets.push(
      <TodoSet
        id={setList[i].id}
        key={setList[i].id}
        index={i + 1}
        isAerobic={isAerobic}
        onDeleteSet={handleDeleteSet}
      ></TodoSet>,
    );
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          right: 0,
          left: 0,
          backgroundColor: 'lightgrey',
        }}
      >
        <Puller />
        <FinishCreateTodoBtn toggleDrawer={toggleDrawer} />
      </Box>
      <Box
        sx={{
          px: 2,
          pb: 2,
          height: '100%',
          overflow: 'auto',
          backgroundColor: 'lightgrey',
        }}
      >
        <TextField label="운동 이름" variant="standard" fullWidth />
        <AerobicSwitch isAerobic={isAerobic} setIsAerobic={setIsAerobic} />
        {todoSets}
        <Button variant="contained" fullWidth onClick={addSet}>
          세트 추가
        </Button>
      </Box>
    </SwipeableDrawer>
  );
}

function CreateTodo() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
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
