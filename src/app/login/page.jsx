'use client';

/* eslint-disable no-console, no-alert */

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Link,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isChecked, setChecked] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(`이메일: ${email}`);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!result.error) {
      alert(`로그인 완료: ${email}`);
      window.location = '/';
    } else {
      console.error(result.error);
      alert('로그인 실패');
    }
  };

  const handleChecked = (e) => {
    console.log(`${e.target.checked}`);
    setChecked(e.target.checked);
  };

  return (
    <Box align="center">
      <Typography variant="h3" sx={{ mt: 15, mb: 10 }}>
        로그인
      </Typography>
      <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
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
        {/*
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChecked} />}
          label="자동 로그인"
        /> */}
        <div>
          <Link
            href="/forgot-password"
            color="inherit"
            underline="hover"
            align="center"
          >
            비밀번호 찾기
          </Link>
          <span> | </span>
          <Link href="/start" color="inherit" underline="hover" align="center">
            회원가입
          </Link>
        </div>
        <Button variant="contained" onClick={handleLoginSubmit}>
          로그인
        </Button>
      </Stack>
    </Box>
  );
}
