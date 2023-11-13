'use client';

/* eslint-disable no-console, no-alert */

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Link,
  TextField,
} from '@mui/material';

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      console.log(`회원가입 완료! 이름: ${username}, email: ${email}`);
      alert('회원가입 완료!');
      window.location = '/start';
    }
  };

  return (
    <Box align="center">
      <Typography variant="h3" sx={{ mt: 15, mb: 10 }}>
        회원가입
      </Typography>
      <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
        <TextField
          label="이름"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          type="email"
          label="이메일 주소"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="비밀번호"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="비밀번호 확인"
          variant="outlined"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />
        <div>
          <span>이미 회원이신가요? </span>
          <Link
            href={() => false}
            color="inherit"
            underline="always"
            align="center"
          >
            로그인
          </Link>
        </div>
        <Button variant="contained" onClick={handleSignupSubmit}>
          가입하기
        </Button>
      </Stack>
    </Box>
  );
}
