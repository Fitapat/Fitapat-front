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

async function createUser(email, password, nickname) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, nickname }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (res.status === 409) {
    alert(data.error); // 이미 가입된 이메일 status code
  } else if (!res.ok) {
    // 다른 오류 처리
    throw new Error(data.message || 'createUser: Something went wrong!');
  }

  return data;
}

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const result = await createUser(email, password, nickname);
        console.log(result);
        console.log(`회원가입 완료! 닉네임: ${nickname}, email: ${email}`);
        alert('회원가입 완료! 로그인해주세요.');
        window.location = '/login';
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box align="center">
      <Typography variant="h3" sx={{ mt: 15, mb: 10 }}>
        회원가입
      </Typography>
      <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
        <TextField
          label="닉네임"
          variant="outlined"
          onChange={(e) => {
            setNickname(e.target.value);
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
          <Link href="/login" color="inherit" underline="always" align="center">
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
