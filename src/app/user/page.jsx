/* eslint-disable no-alert */

'use client';

import React from 'react';
import { Stack, Link, Box } from '@mui/material';
import SignInButton from '../../components/signInButton';

export default function User() {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <SignInButton />
      </Box>
      <Stack spacing={10} sx={{ padding: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          설정
        </Link>
        <Link href="/" color="inherit" underline="hover">
          개인정보
        </Link>
        <Link href="/delete" color="inherit" underline="hover">
          회원탈퇴
        </Link>
      </Stack>
    </div>
  );
}
