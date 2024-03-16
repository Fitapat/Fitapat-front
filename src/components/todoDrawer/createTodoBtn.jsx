import { Button } from '@mui/material';

export default function CreateTodoBtn({ toggleDrawer, setDrawerType }) {
  const handleClick = () => {
    setDrawerType(0);
    toggleDrawer(true);
  };

  return (
    <Button variant="contained" fullWidth={true} onClick={handleClick}>
      운동 To-do 추가
    </Button>
  );
}
