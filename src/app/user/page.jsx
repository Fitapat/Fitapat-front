'use client';

import React from 'react';
import { Button, Stack, Link, Avatar, Typography, Card, CardContent } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function User() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    const card = ( <React.Fragment><CardContent>
      <Stack direction="column" alignItems="center" spacing={2}>      
      <Avatar
        alt={session.user.nickname}
        src="/broken-image.jpg"
        sx={{width: 80, height:80, fontSize:50}}
      />
      <Typography variant='h5'>
        {session.user.nickname}
      </Typography>
    
      <Button variant="text" onClick={() => signOut()} sx={{ margin: 0 }}>
        로그아웃
      </Button>

    </Stack></CardContent></React.Fragment>);
    return (
      <div>
        <Stack spacing={4} sx={{ padding: 4 }}>
          <Card variant='outlined' sx={{padding:1.5}}>{card}</Card>
          <List sx={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsApplicationsSharpIcon />
              </ListItemIcon>
              <ListItemText primary="설정" />
            </ListItemButton>
            <ListItemButton onClick={() => (window.location.href = '/delete')}>
              <ListItemIcon>
                <DisabledByDefaultRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="회원 탈퇴" />
            </ListItemButton>
          </List>
        </Stack>
      </div>
    );
  }

  return (
    <div style={{height: '100%', display:'flex', justifyContent: 'center',
      alignItems: 'center' }}>
      <Stack direction="column" alignItems="center" spacing={2}>
      <Typography variant='h7'>로그인 후 이용 가능한 서비스입니다.</Typography>
      <Stack direction="row">
      <Button
        variant="text"
        onClick={() => (window.location.href = '/register')}
        sx={{ margin: 0 }}
      >
        회원가입
      </Button>
      <Button
        variant="text"
        onClick={() => (window.location.href = '/login')}
        sx={{ margin: 0 }}
      >
        로그인
      </Button>
      </Stack>
      </Stack>
    </div>
  );
}
