import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
/*app/items/route.ts*/
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Box } from '@mui/material';

// 각 운동마다 가장 강한 강도를 찾아서 그것의 강도와 time을 리턴하는 함수
const findMaxIntensity = (workout) => {
  let maxIntensity = 0;
  let maxTime = 0;
  workout.sets.forEach((set) => {
    if (set.intensity > maxIntensity) {
      maxIntensity = set.intensity;
      maxTime = set.time;
    }
  });
  return { maxIntensity, maxTime };
};

export default function SelectWorkoutButtons(props) {
  const { workouts, handleSelectWorkout, selectedWorkout } = props;

  const handleChange = (event, nextView) => {
    handleSelectWorkout(nextView);
    console.log(nextView);
  };

  return (
    <div>
      {workouts.length > 0 && (
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedWorkout}
          onChange={handleChange}
        >
          {workouts.map((item, idx) => {
            const { maxIntensity, maxTime } = findMaxIntensity(item);
            return (
              <ToggleButton value={item} aria-label={item.title} key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 1,
                  }}
                >
                  {item.aerobic ? (
                    <DirectionsRunIcon sx={{ pr: 1 }} />
                  ) : (
                    <FitnessCenterIcon sx={{ pr: 1 }} />
                  )}

                  <Box sx={{ pr: 1 }}>{item.title}</Box>
                  <Box sx={{ pr: 1 }}>{item.sets.length} 세트</Box>
                  <Box sx={{ pr: 1 }}>
                    {maxIntensity} {item.aerobic ? '속도' : 'KG'}
                  </Box>
                  <Box sx={{ pr: 1 }}>
                    {maxTime} {item.aerobic ? '분' : '회'}
                  </Box>
                </Box>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      )}
    </div>
  );
}
