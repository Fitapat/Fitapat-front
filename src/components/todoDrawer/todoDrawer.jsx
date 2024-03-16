'use client';

import { useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import TodoSet from './todoSet';
import InterruptDialog from './interruptDialog';
import todoAPI from '/src/apis/todoAPI.js';

const drawerBleeding = 56;

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
      control={<Switch checked={isAerobic} />}
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

export default function TodoDrawer({
  open,
  toggleDrawer,
  drawerType,
  date,
  item,
}) {
  const [title, setTitle] = useState('');
  const [isAerobic, setIsAerobic] = useState(true);
  const [nextId, setNextId] = useState(2);
  const [setList, setSetList] = useState([
    { id: 'set-1', intensity: 0, time: 0 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // 투두 편집 - 기존 값 띄우기
    if (open && drawerType === 1) {
      setTitle(item.title);
      setIsAerobic(item.aerobic);
      let prevSetList = item.sets.map((set, index) => ({
        id: 'set-' + (nextId + index),
        intensity: set.intensity,
        time: set.time,
      }));
      setSetList(prevSetList);
      setNextId(nextId + item.sets.length);
    }
  }, [open]);

  const initialize = () => {
    setTitle('');
    setIsAerobic(true);
    setNextId(nextId + 1);
    setSetList([{ id: 'set-' + nextId, intensity: null, time: null }]);
  };

  const handleInputTitle = (event) => {
    setTitle(event.target.value);
  };

  const addSet = () => {
    setNextId(nextId + 1);
    let newSetList = setList.slice();
    newSetList.push({ id: 'set-' + nextId, intensity: null, time: null });
    setSetList(newSetList);
  };

  const handleDeleteSet = (id) => {
    let newSetList = setList.filter((set) => set.id !== id);
    setSetList(newSetList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 모두 입력된 경우 서버에 전송
    if (checkAllFilled(title, setList)) {
      // 투두 생성
      if (drawerType === 0) {
        todoAPI
          .createTodo({
            title: title,
            aerobic: isAerobic,
            sets: setList,
            date: date,
          })
          .then(() => {
            console.log('createTodo success!');
            initialize();
          });
      }
      // 투두 편집
      else if (drawerType === 1) {
        item.title = title;
        item.aerobic = isAerobic;
        item.sets = setList;
        todoAPI.updateTodo(item).then(() => {
          initialize();
        });
      }

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
    initialize();
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
          '.MuiBox-root > .PrivateSwipeArea-root': {
            display: 'none',
          },
        }}
      />
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
              value={title}
              fullWidth
              onChange={handleInputTitle}
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
    </Box>
  );
}
