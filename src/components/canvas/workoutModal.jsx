import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Box from '@mui/material/Box';
import SelectWorkoutButtons from './selectWorkoutButtons';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function WorkoutModal(props) {
  // 운동 예시 오브젝트
  const EXAMPLE_WORKOUT1 = {
    user_id: '1',
    title: '벤치프레스',
    date: '2021-10-10',
    aerobic: false,
    done: true,
    sets: [
      {
        intensity: '30kg',
        time: 10,
      },
      {
        intensity: '40kg',
        time: 8,
      },
      {
        intensity: '50kg',
        time: 6,
      },
    ],
  };

  const EXAMPLE_WORKOUT2 = {
    user_id: '1',
    title: '스쿼트',
    date: '2021-10-10',
    aerobic: false,
    done: true,
    sets: [
      {
        intensity: '30kg',
        time: 10,
      },
      {
        intensity: '40kg',
        time: 8,
      },
      {
        intensity: '50kg',
        time: 6,
      },
    ],
  };

  const EXAMPLE_WORKOUT3 = {
    user_id: '1',
    title: '런닝머신',
    date: '2021-10-10',
    aerobic: true,
    done: true,
    sets: [
      {
        intensity: '6km/h',
        time: 10,
      },
      {
        intensity: '7km/h',
        time: 8,
      },
      {
        intensity: '8km/h',
        time: 6,
      },
    ],
  };

  const EXAMPLE_WORKOUTS = [
    EXAMPLE_WORKOUT1,
    EXAMPLE_WORKOUT2,
    EXAMPLE_WORKOUT3,
  ];
  const workouts = EXAMPLE_WORKOUTS;

  const [open, setOpen] = React.useState(false);
  const [isStyle, setIsStyle] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <FitnessCenterIcon
        stroke={'lightgray'}
        strokeWidth={0.5}
        fontSize="medium"
        onClick={handleClickOpen}
      ></FitnessCenterIcon>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, mr: 5 }} id="customized-dialog-title">
          기록할 운동을 선택하세요
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <SelectWorkoutButtons workouts={workouts} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            스타일 선택
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
