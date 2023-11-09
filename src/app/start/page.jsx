'use client';

import React, { useState, useEffect } from 'react';
import {
  Fade,
  Stack,
  Typography,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@mui/material';

export default function Start() {
  const [isTitleVisible, setTitleVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);

  const [isDialogOpened, setDialogOpened] = useState(false);

  const handleDialogOpened = () => {
    setDialogOpened(true);
  };
  const handleDialogClosed = () => {
    setDialogOpened(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    const titleTimeout = setTimeout(() => {
      setTitleVisible(true);
    }, 500);

    const contentTimeout = setTimeout(() => {
      setContentVisible(true);
    }, 1000);

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(contentTimeout);
    };
  }, []);

  return (
    <div>
      <div align="center">
        <Stack spacing={2} sx={{ mt: 20, mb: 10 }}>
          <Slide direction="right" in={true}>
            <Typography variant="h6">오늘도 운동 완료.</Typography>
          </Slide>
          <Fade in={isTitleVisible}>
            <Typography variant="h2">Fit a Pat</Typography>
          </Fade>
        </Stack>
      </div>
      <div>
        <Fade in={isContentVisible}>
          <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 600, padding: 3 }}>
            <Button variant="outlined">Google로 시작하기</Button>
            <Button variant="outlined">카카오로 시작하기</Button>
            <Button variant="outlined">Apple로 시작하기</Button>
            <br />
            <Link
              href="#"
              onClick={handleDialogOpened}
              color="inherit"
              underline="always"
              align="center"
            >
              다른 방법으로 시작하기
            </Link>
            <Link href="#" color="inherit" underline="always" align="center">
              로그인
            </Link>
          </Stack>
        </Fade>

        {isDialogOpened && (
          <Dialog
            open={isDialogOpened}
            TransitionComponent={Transition}
            fullWidth={true}
            onClose={handleDialogClosed}
          >
            <DialogTitle align="center">다른 방법으로 시작하기</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ px: 3 }}>
                <Button variant="outlined" onClick={handleDialogClosed}>
                  FaceBook으로 시작하기
                </Button>
                <Button variant="outlined" onClick={handleDialogClosed}>
                  네이버로 시작하기
                </Button>
                <Button variant="contained" onClick={handleDialogClosed}>
                  이메일로 시작하기
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
