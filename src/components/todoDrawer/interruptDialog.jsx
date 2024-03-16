'use client';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';

export default function InterruptDialog({ open, onCloseDialog, onInterrupt }) {
  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      sx={{
        textAlign: 'center',
        width: '80%',
        maxWidth: '380px',
        margin: '0 auto',
      }}
    >
      <DialogTitle>변경사항 삭제</DialogTitle>
      <DialogContent>
        <Typography>아직 입력이 완료되지 않았습니다.</Typography>
        <Typography>변경사항을 삭제할까요?</Typography>
      </DialogContent>
      <DialogActions sx={{ margin: '0 auto' }}>
        <Button onClick={onCloseDialog}>취소</Button>
        <Button onClick={onInterrupt}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
