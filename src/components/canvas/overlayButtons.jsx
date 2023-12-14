import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import WorkoutModal from './workoutModal';
import DownloadIcon from '@mui/icons-material/Download';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OverlayButtons(props) {
  const { canvas, handleSaveImage } = props;

  return (
    <Box
      sx={{
        width: 1,
        height: 'auto',
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        boxSizing: 'border-box',

        '& *': {
          color: 'white',
          size: 'large',
        },
      }}
    >
      <Box // 상단 아이콘들
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 1,
          height: 'auto',
        }}
      >
        <Box // 왼쪽 상단 아이콘들
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 0.5,
            height: 'auto',
          }}
        >
          <Button sx={{ height: 1 }}>
            <Link href="/selectpic">
              <NavigateBeforeIcon
                fontSize="large"
                stroke={'lightgray'}
                strokeWidth={0.5}
              ></NavigateBeforeIcon>
            </Link>
          </Button>
        </Box>
        <Box // 오른쪽 상단 아이콘들
          sx={{
            width: 0.5,
            height: 'auto',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginRight: 2,
          }}
        >
          <Button sx={{ height: 1 }}>
            <DeleteIcon
              stroke={'lightgray'}
              strokeWidth={0.5}
              fontSize="medium"
              onClick={props.handleDeleteButton}
            ></DeleteIcon>
            <Snackbar
              open={props.triggerBgDelete}
              autoHideDuration={3000}
              onClose={props.handleBgErrorClose}
            >
              <Alert
                onClose={props.handleBgErrorClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                배경은 삭제 할 수 없습니다.
              </Alert>
            </Snackbar>
          </Button>
          <Button>
            <WorkoutModal canvas={canvas} />
          </Button>
          <Button sx={{ height: 1 }}>
            <DownloadIcon onClick={() => handleSaveImage()}></DownloadIcon>
          </Button>
        </Box>
      </Box>
      {/* <Box // 하단 아이콘들
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: 1,
          height: 'auto',
        }}
      >
        <Button>
          <DownloadIcon></DownloadIcon>
        </Button>
      </Box> */}
    </Box>
  );
}
