'use client';

/* eslint-disable no-console, no-alert */

import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';

export default function Delete() {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      setEmail(session.user.email);
    }
  }, [session, status]);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await fetch('/api/auth/delete', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        signOut();
        alert(`${email} 계정이 탈퇴되었습니다.`);
        // window.location.href = ('/');
      } else if (res.status === 404) {
        alert('존재하지 않는 계정입니다.');
      } else if (res.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (res.status === 500) {
        alert('서버 에러');
      } else {
        alert('에러');
      }
    } catch (error) {
      alert('에러: ', error);
    }
  };

  return (
    <div>
      <Box align="center">
        <Typography variant="h4" sx={{ mt: 15, mb: 10 }}>
          회원탈퇴
        </Typography>
        <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
          <span>
            현재 계정:
            {email}
          </span>
          <br />
          <span>비밀번호를 입력하시면 회원탈퇴가 완료됩니다.</span>
          <br />
          <TextField
            type="password"
            label="비밀번호"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" onClick={handleDeleteUser}>
            탈퇴하기
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
