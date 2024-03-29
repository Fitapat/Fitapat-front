import {
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function TodoSet({
  id,
  index,
  isAerobic,
  onDeleteSet,
  setList,
  setSetList,
}) {
  let { intensity, time } = setList.filter((set) => id === set.id)[0];
  const handleInput = (event) => {
    const name = event.target.name;
    const value = Number(event.target.value);

    let newSetList = setList.slice();
    newSetList.map((set) => {
      if (set.id === id) {
        if (name === 'intensity') set.intensity = value;
        else if (name === 'time') set.time = value;
      }
    });
    setSetList(newSetList);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'grey',
        borderRadius: 8,
        marginBottom: '20px',
      }}
    >
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} color="textPrimary">
          {index} Set
        </Typography>
        <TextField
          name="intensity"
          variant="outlined"
          type="number"
          onChange={handleInput}
          value={intensity}
          size="small"
          sx={{
            width: '20%',
            backgroundColor: 'white',
            borderRadius: 2,
            margin: 1,
          }}
        />
        <Typography sx={{ flexGrow: 1 }}>{isAerobic ? 'km' : 'kg'}</Typography>
        <TextField
          name="time"
          variant="outlined"
          type="number"
          onChange={handleInput}
          value={time}
          size="small"
          sx={{
            width: '20%',
            backgroundColor: 'white',
            borderRadius: 2,
            margin: 1,
          }}
        />
        <Typography sx={{ flexGrow: 1 }}>{isAerobic ? '분' : '회'}</Typography>
        <IconButton aria-label="delete set" onClick={() => onDeleteSet(id)}>
          <CloseIcon htmlColor="black" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
