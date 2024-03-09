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
import StylePicker from './stylePicker';
import dayjs from 'dayjs';
import todoAPI from '/src/apis/todoAPI';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const addObjectToCanvas = (canvas, object) => {
  canvas.add(object);
  canvas.renderAll();
};

export default function WorkoutModal(props) {
  const { canvas } = props;
  const [open, setOpen] = React.useState(false);
  const [isStyle, setIsStyle] = React.useState(false);
  const [workouts, setWorkouts] = React.useState([]);
  const [selectedWorkout, setSelectedWorkout] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setIsStyle(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleStyleSelect = () => {
    setIsStyle(true);
  };
  const handleStyleConfirm = () => {
    setIsStyle(false);
    setOpen(false);
  };

  const getWorkouts = async () => {
    const date = dayjs();
    await todoAPI
      .getTodo(date, 'd')
      .then((res) => res.json())
      .then((res) => {
        setWorkouts(res);
      })
      .catch((err) => {
        console.log('workoutModal', err);
      });
  };

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

  React.useEffect(() => {
    getWorkouts();
  }, []);

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
        {!isStyle ? (
          <React.Fragment>
            <DialogTitle
              sx={{ m: 0, p: 2, mr: 5 }}
              id="customized-dialog-title"
            >
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
                <SelectWorkoutButtons
                  workouts={workouts}
                  handleSelectWorkout={handleSelectWorkout}
                  selectedWorkout={selectedWorkout}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleStyleSelect}>
                스타일 선택
              </Button>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle
              sx={{ m: 0, p: 2, mr: 5 }}
              id="customized-dialog-title"
            >
              스타일을 선택하세요
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <StylePicker
                  selectedWorkout={selectedWorkout}
                  canvas={canvas}
                  handleClose={handleClose}
                />
              </Box>
            </DialogContent>
          </React.Fragment>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
