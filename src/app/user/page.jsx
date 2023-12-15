/* eslint-disable no-alert */

'use client';

import React from 'react';
import { Stack, Button, Link } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';

const handleLogoutSubmit = (e) => {
  e.preventDefault();
  signOut({ callbackUrl: '/', redirect: false });
  alert('로그아웃되었습니다.');
};

export default function User() {
  const { session, status } = useSession();

  return (
    <div>
      {status === 'authenticated' ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            onClick={handleLogoutSubmit}
            sx={{ margin: 3 }}
          >
            로그아웃
          </Button>
          {/* 현재 로그인중인 사용자 이메일 표시 */}
          <div>
            현재 로그인:
            {status === 'authenticated' ? session?.user?.email : 'X'}
          </div>
        </div>
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
