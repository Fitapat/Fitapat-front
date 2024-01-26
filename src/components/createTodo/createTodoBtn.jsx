import { Button } from '@mui/material';

export default function CreateTodoBtn({ toggleDrawer }) {
  return (
    <Button
      variant="contained"
      fullWidth={true}
      onClick={() => toggleDrawer(true)}
    >
      운동 To-do 추가
    </Button>
  );
}
