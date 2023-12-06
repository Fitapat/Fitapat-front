import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function SelectWorkoutButtons(props) {
  const workouts = props.workouts;

  const [view, setView] = React.useState(() => []);

  const handleChange = (event, nextView) => {
    setView(nextView);
    console.log('view', view);
    console.log('nextView', nextView);
  };

  return (
    <div>
      {workouts.length > 0 && (
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          onChange={handleChange}
        >
          {workouts.map((item, idx) => (
            <ToggleButton value={item.title} aria-label={item.title} key={idx}>
              {item.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </div>
  );
}
