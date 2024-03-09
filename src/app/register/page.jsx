'use client';

/* eslint-disable no-console, no-alert, no-useless-escape */

import React, { useState } from 'react';
import { Box, Stack, Typography, Button, Link, TextField } from '@mui/material';
import authAPI from '/src/apis/authAPI';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (!pattern.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await authAPI.signup(email, password, nickname);
      const data = await res.json();
      if (res.ok) {
        console.log(`회원가입 완료, 닉네임: ${nickname}, email: ${email}`);
        alert('회원가입 완료! 로그인해주세요.');
        window.location = '/login';
      } else if (res.status === 409 || res.status === 500) {
        alert(data.error); // 해당 status의 에러 메시지 출력
      } else {
        alert('에러');
      }
    } catch (error) {
      alert('에러: ', error);
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
