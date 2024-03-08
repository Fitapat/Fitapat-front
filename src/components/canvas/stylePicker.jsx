import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { fabric } from 'fabric';

function simpleObjectToString(workouts) {
  let string = '';
  for (let i = 0; i < workouts.length; i++) {
    string += workouts[i].title + ' ';
    string += workouts[i].sets.length + ' sets\n';

    for (let j = 0; j < workouts[i].sets.length; j++) {
      if (workouts[i].aerobic) {
        string +=
          workouts[i].sets[j].intensity +
          'km/h | ' +
          workouts[i].sets[j].time +
          'min\n';
      } else {
        string +=
          workouts[i].sets[j].intensity +
          'kg | ' +
          workouts[i].sets[j].time +
          'reps\n';
      }
    }
    string += '\n';
  }
  return string;
}

function simpleText(workoutsString, color) {
  const text = new fabric.Text(workoutsString, {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    fill: color,
    fontWeight: 'bold',
    originX: 'center',
    originY: 'center',
  });
  return text;
}

function addItemToCanvasCenter(canvas, item) {
  item.set({
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    zIndex: 2,
  });
  canvas.discardActiveObject();
  // Activate 될 때마다 가장 앞으로 오도록 이벤트리스너 등록
  canvas.on('object:selected', function (options) {
    options.target.bringToFront();
  });
  canvas.add(item);
  canvas.renderAll();
}

// make a function that makes a fabric text object into Image
function textToImage(text) {}

export default function StylePicker(props) {
  const { canvas, selectedWorkout, handleClose } = props;
  const [value, setValue] = React.useState('simple');
  const [textColor, setTextColor] = React.useState('white');
  const [workoutResult, setWorkoutResult] = React.useState(null);
  const [workoutImage, setWorkoutImage] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (value === null || value === undefined) return;

    if (value === 'white') {
      const workoutsString = simpleObjectToString(selectedWorkout);
      const text = simpleText(workoutsString, 'white');
      setWorkoutResult(text);
    }

    if (value === 'black') {
      const workoutsString = simpleObjectToString(selectedWorkout);
      const text = simpleText(workoutsString, 'black');
      setWorkoutResult(text);
    }
  }, [value]);

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="White" value="white" />
            <Tab label="Black" value="black" />
          </TabList>
        </Box>
        {/* <TabPanel value="white"></TabPanel>
        <TabPanel value="black"></TabPanel> */}
      </TabContext>
      <Button
        sx={{
          mt: 2,
        }}
        variant="contained"
        onClick={() => {
          addItemToCanvasCenter(canvas, workoutResult);
          handleClose();
        }}
      >
        Add
      </Button>
    </Box>
  );
}
