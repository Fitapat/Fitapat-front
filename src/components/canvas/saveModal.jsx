import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';

export default function SaveModal(props) {
  const { handleSaveOpen, handleSaveClose, saveOpen } = props;

  return (
    <React.Fragment>
      <Dialog
        open={saveOpen}
        onClose={handleSaveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'알림'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            성공적으로 저장되었습니다. 메인 화면으로 돌아가시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClose}>Disagree</Button>
          <Link href="/">
            <Button onClick={handleSaveClose} autoFocus>
              Agree
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
