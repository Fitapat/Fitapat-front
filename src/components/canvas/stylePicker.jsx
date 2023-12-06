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
          'km/h x ' +
          workouts[i].sets[j].time +
          'min\n';
      } else {
        string +=
          workouts[i].sets[j].intensity +
          'kg x ' +
          workouts[i].sets[j].time +
          'reps\n';
      }
    }
    string += '\n';
  }
  return string;
}

function simpleText(workoutsString) {
  const text = new fabric.Text(workoutsString, {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Helvetica',
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    fontWeight: 'bold',
    originX: 'center',
    originY: 'center',
  });
  return text;
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

    if (value === 'simple') {
      const workoutsString = simpleObjectToString(selectedWorkout);
      const text = simpleText(workoutsString);
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
            <Tab label="Simple" value="simple" />
            {
              // WIP: Work In Progress
            }
            <Tab label="Work In Progress.." value="WIP" disabled={true} />{' '}
          </TabList>
        </Box>
        <TabPanel value="simple"></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
      <Button
        variant="contained"
        onClick={() => {
          canvas.add(workoutResult);
          handleClose();
        }}
      >
        Add
      </Button>
    </Box>
  );
}
