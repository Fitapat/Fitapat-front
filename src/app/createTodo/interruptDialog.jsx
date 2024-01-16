'use client';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';

export default function InterruptDialog({ open, onCloseDialog, onInterrupt }) {
  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>변경사항 삭제</DialogTitle>
      <DialogContent>
        아직 입력이 완료되지 않았습니다. 변경사항을 삭제할까요?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>취소</Button>
        <Button onClick={onInterrupt}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
