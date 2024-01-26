'use client';

import { useState } from 'react';
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TodoSet from './todoSet';
import InterruptDialog from './interruptDialog';
import { drawerBleeding } from './page';

// 서랍창 상단 작은 막대기
const Puller = styled(Box)(() => ({
  width: 40,
  height: 6,
  backgroundColor: 'white',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function FinishCreateTodoBtn() {
  return (
    <Button
      type="submit"
      variant="text"
      sx={{ p: 2, left: 'calc(100% - 70px)' }}
      disableRipple
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
      sx={{ marginBottom: 1 }}
    />
  );
}

function checkAllFilled(title, setList) {
  if (!title) return false;

  for (let i = 0; i < setList.length; i++) {
    if (!(setList[i].intensity && setList[i].time)) return false;
  }
  return true;
}

export default function CreateTodoDrawer({ open, toggleDrawer }) {
  const [isAerobic, setIsAerobic] = useState(true);
  const [nextId, setNextId] = useState(2);
  const [setList, setSetList] = useState([
    { id: 'set-1', intensity: 0, time: 0 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const addSet = () => {
    setNextId(nextId + 1);
    let newSetList = setList.slice();
    newSetList.push({ id: 'set-' + nextId, intensity: 0, time: 0 });
    setSetList(newSetList);
  };

  const handleDeleteSet = (id) => {
    let newSetList = setList.filter((set) => set.id !== id);
    setSetList(newSetList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title');

    if (checkAllFilled(title, setList)) {
      // 모두 입력된 경우 서버에 전송
      console.log({
        title: title,
        areobic: isAerobic,
        sets: setList,
      });

      toggleDrawer(false);
    } else {
      handleOpenDialog();
    }
  };

  // 변경사항 삭제 다이얼로그 (팝업창)
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleInterrupt = () => {
    setOpenDialog(false);
    toggleDrawer(false);
    // 투두 입력창 초기화
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
        setList={setList}
        setSetList={setSetList}
      ></TodoSet>,
    );
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleOpenDialog}
      onOpen={() => toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ height: '100%', backgroundColor: 'lightgrey', padding: 2 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            right: 0,
            left: 0,
            backgroundColor: 'lightgrey',
          }}
        >
          <Puller />
          <FinishCreateTodoBtn />
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
          <TextField
            name="title"
            label="운동 이름"
            variant="standard"
            fullWidth
          />
          <AerobicSwitch isAerobic={isAerobic} setIsAerobic={setIsAerobic} />
          {todoSets}
          <Button variant="contained" fullWidth onClick={addSet}>
            세트 추가
          </Button>
        </Box>
      </Box>
      <InterruptDialog
        open={openDialog}
        onCloseDialog={handleCloseDialog}
        onInterrupt={handleInterrupt}
      />
    </SwipeableDrawer>
  );
}
