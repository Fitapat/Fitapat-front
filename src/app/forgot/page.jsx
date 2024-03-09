'use client';

/* eslint-disable no-console, no-alert */

import React, { useState } from 'react';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';
import authAPI from '/src/apis/authAPI';

export default function Forgot() {
  const [email, setEmail] = useState();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      const res = await authAPI.forgot(email);
      if (res.ok) {
        alert(
          `${email} 로 메일이 전송되었습니다. 1시간 이내로 비밀번호를 재설정해주시기 바랍니다.`,
        );
      } else if (res.status === 404) {
        alert('가입되지 않은 이메일입니다.');
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
