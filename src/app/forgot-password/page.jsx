'use client';

/* eslint-disable no-console, no-alert */

import React, { useState } from 'react';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    // console.log(`이메일: ${email}`);
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      alert(`이메일 전송 완료: ${email}`);
    } else {
      console.error(res.error);
      if (res.error === '가입되지 않은 이메일') {
        alert('가입되지 않은 이메일입니다.');
      } else {
        alert('로그인 실패');
      }
    }
  };

  return (
    <Box align="center">
      <Typography variant="h4" sx={{ mt: 15, mb: 10 }}>
        비밀번호 찾기
      </Typography>
      <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
        <span>가입하신 이메일 주소를 입력해 주세요.</span>
        <span>
          해당 이메일 주소로 비밀번호를 재설정할 수 있는 링크를 보내드립니다.
        </span>
        <br />
        <TextField
          type="email"
          label="이메일"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSendEmail}>
          이메일 전송하기
        </Button>
      </Stack>
    </Box>
  );
}
