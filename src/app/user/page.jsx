/* eslint-disable no-alert */

'use client';

import React from 'react';
import { Stack, Button, Link } from '@mui/material';
import Footer from '@/components/footer';

const handleLogoutSubmit = (e) => {
  e.preventDefault();
  window.location = '/login';
  alert('로그아웃되었습니다.');
};

export default function User() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="text" onClick={handleLogoutSubmit} sx={{ margin: 3 }}>
          로그아웃
        </Button>
      </div>
      <Stack spacing={10} sx={{ padding: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          설정
        </Link>
        <Link href="/" color="inherit" underline="hover">
          개인정보
        </Link>
        <Link href="/" color="inherit" underline="hover">
          회원탈퇴
        </Link>
      </Stack>
      <Footer />
    </div>
  );
}
