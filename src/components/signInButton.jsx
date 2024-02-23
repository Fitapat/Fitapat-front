'use client';

import React from 'react';
import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div>
        <div>
          세션 status:
          {status}
        </div>
        <Button variant="text" onClick={() => signOut()} sx={{ margin: 0 }}>
          {session.nickname}님 로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div>
        세션 status:
        {status}
      </div>
      <Button
        variant="text"
        onClick={() => (window.location.href = '/login')}
        sx={{ margin: 0 }}
      >
        로그인
      </Button>
    </div>
  );
}

export default SignInButton;
