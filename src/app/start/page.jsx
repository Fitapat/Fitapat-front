'use client';

import React, { useState, useEffect } from 'react';
import {
  Fade,
  Stack,
  Typography,
  Box,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@mui/material';

export default function Start() {
  const [showSlide, setShowSlide] = useState(false);
  const [isTitleVisible, setTitleVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);

  const [isDialogOpened, setDialogOpened] = useState(false);

  const handleDialogOpened = () => {
    setDialogOpened(true);
  };
  const handleDialogClosed = () => {
    setDialogOpened(false);
  };

  useEffect(() => {
    setShowSlide(true);

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
      <Box align="center">
        <Stack spacing={2} sx={{ mt: 20, mb: 10 }}>
          <Slide direction="right" in={showSlide} timeout={150}>
            <Typography variant="h6">오늘도 운동 완료.</Typography>
          </Slide>
          <Fade in={isTitleVisible}>
            <Typography variant="h2">Fit a Pat</Typography>
          </Fade>
        </Stack>
      </Box>
      <div>
        <Fade in={isContentVisible}>
          <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 600, padding: 3 }}>
            <Button variant="outlined">Google로 시작하기</Button>
            <Button variant="outlined">카카오로 시작하기</Button>
            <Button variant="outlined">Apple로 시작하기</Button>
            <br />
            <Box align="center">
              <Button onClick={handleDialogOpened} color="inherit">
                다른 방법으로 시작하기
              </Button>
            </Box>
            <Link
              href={() => false}
              color="inherit"
              underline="always"
              align="center"
            >
              로그인
            </Link>
          </Stack>
        </Fade>
        <Slide direction="up" in={isDialogOpened}>
          <Dialog open onClose={handleDialogClosed}>
            <DialogTitle align="center">다른 방법으로 시작하기</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ px: 3 }}>
                <Button variant="outlined" onClick={handleDialogClosed}>
                  FaceBook으로 시작하기
                </Button>
                <Button variant="outlined" onClick={handleDialogClosed}>
                  네이버로 시작하기
                </Button>
                <Button variant="contained" href="/register">
                  이메일로 시작하기
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Slide>
      </div>
    </div>
  );
}
