'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
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

function TodoSets(props) {
  return (
    <Box
      sx={{
        backgroundColor: 'grey',
        borderRadius: 2,
        marginBottom: '20px',
      }}
    >
      {props.num} Set
      <TextField
        variant="outlined"
        type="number"
        size="small"
        margin="dense"
        sx={{ width: '20%', backgroundColor: 'white', borderRadius: 2 }}
      ></TextField>
      kg
      <TextField
        variant="outlined"
        type="number"
        size="small"
        margin="dense"
        sx={{ width: '20%', backgroundColor: 'white', borderRadius: 2 }}
      ></TextField>
      회
    </Box>
  );
}

function SwipeableEdgeDrawer() {
  const [open, setOpen] = useState(false);
  const [numSets, setNumSets] = useState(1);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const addSet = () => {
    setNumSets(numSets + 1);
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
        <Button
          variant="contained"
          fullWidth={true}
          onClick={toggleDrawer(true)}
        >
          운동 To-do 추가
        </Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: 'lightgrey',
          }}
        >
          <Puller />
          <Button variant="text" sx={{ p: 2, left: 'calc(100% - 70px)' }}>
            완료
          </Button>
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
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="유산소 여부"
          />
          <TodoSets num={numSets}></TodoSets>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              addSet();
            }}
          >
            세트 추가
          </Button>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}

export default SwipeableEdgeDrawer;
