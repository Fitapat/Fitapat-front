/* eslint-disable no-alert */

'use client';

import React from 'react';
import {
  Stack,
  Button,
  Link,
  Box,
} from '@mui/material';
import { useSession, signOut } from 'next-auth/react';

const handleLogoutSubmit = (e) => {
  e.preventDefault();
  signOut({ callbackUrl: '/', redirect: false });
  alert('로그아웃되었습니다.');
};

export default function User() {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'authenticated' ? (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          {/* 현재 로그인중인 사용자 이메일 표시 */}
          <div>
            현재 로그인:
            {status === 'authenticated' ? session?.user?.email : '(error)'}
          </div>
          <Button
            variant="text"
            onClick={handleLogoutSubmit}
            sx={{ margin: 0 }}
          >
            로그아웃
          </Button>
        </Box>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/register" underline="hover" sx={{ margin: 1 }}>
            회원가입
          </Link>
          <Link href="/login" underline="hover" sx={{ margin: 1 }}>
            로그인
          </Link>
        </div>
      )}

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
    </div>
  );
}
