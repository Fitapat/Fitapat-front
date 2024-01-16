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
  const handleInput = (event) => {
    const name = event.target.name;
    const value = Number(event.target.value);

    let newSetList = setList.slice();
    newSetList.map((set) => {
      if (set.id === id) {
        if (name === 'load') set.load = value;
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
        borderRadius: 2,
        marginBottom: '20px',
      }}
    >
      <Toolbar disableGutters={true}>
        <Typography>{index} Set</Typography>
        <TextField
          name="load"
          variant="outlined"
          type="number"
          onChange={handleInput}
          size="small"
          margin="dense"
          sx={{
            width: '20%',
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        />
        <Typography>{isAerobic ? 'km' : 'kg'}</Typography>
        <TextField
          name="time"
          variant="outlined"
          type="number"
          onChange={handleInput}
          size="small"
          margin="dense"
          sx={{
            width: '20%',
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        />
        <Typography>{isAerobic ? '분' : '회'}</Typography>
        <IconButton aria-label="delete set" onClick={() => onDeleteSet(id)}>
          <CloseIcon htmlColor="black" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
