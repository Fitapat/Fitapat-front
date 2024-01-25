'use client';

/* eslint-disable no-console, no-alert */

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';

// p = {params: {userToken: '...'}, searchParams: {...}}
export default function Reset(p) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [confirmUserPassword, setConfirmUserPassword] = useState('');

  useEffect(() => {
    const verifyResetToken = async () => {
      const { params } = p;
      const { resetToken } = params;
      console.log('resetToken = ', resetToken);

      // resetToken을 verify해서 어떤 계정인지 알아오자
      const res = await fetch('/api/auth/verifyResetToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken }),
      });
      const user = await res.json();

      if (res.ok) {
        const { email } = user;
        setUserEmail(email);
      } else {
        console.error(res.error);
        alert('유효하지 않은 링크');
      }
    };

    verifyResetToken();
  }, []);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    // alert(`이메일: ${userEmail}, 새 비밀번호: ${userPassword}`);
    if (userPassword !== confirmUserPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      try {
        // 새 비밀번호를 db에 적용하기
        const res = await fetch('/api/auth/reset', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail, password: userPassword }),
        });
        if (res.ok) {
          alert(
            `${userEmail}님의 비밀번호가 변경되었습니다. 다시 로그인해주세요.`,
          );
          window.location = '/login';
        } else {
          console.error(res.error);
          alert('비밀번호 변경 실패');
        }
      } catch (error) {
        console.error(error);
        alert('비밀번호 변경 실패');
      }
    }
  };

  return (
    <Box align="center">
      <Typography variant="h4" sx={{ mt: 15, mb: 10 }}>
        비밀번호 재설정
      </Typography>
      <Stack spacing={2} sx={{ margin: 'auto', maxWidth: 500, padding: 3 }}>
        <span>
          현재 계정:
          {userEmail}
        </span>
        <span>새로운 비밀번호를 입력해 주세요.</span>
        <br />
        <TextField
          type="password"
          label="새 비밀번호"
          variant="outlined"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="새 비밀번호 확인"
          variant="outlined"
          onChange={(e) => {
            setConfirmUserPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleResetSubmit}>
          설정 완료
        </Button>
      </Stack>
    </Box>
  );
}
