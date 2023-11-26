'use client';

import { usePathname, useRouter } from 'next/navigation';

import { React } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };

  const value = pathname;
  return (
    <BottomNavigation
      value={value}
      style={{
        position: 'fixed',
        bottom: 0,
        /* left: 0, right: 0, */
        width: '385px', // 수정하기
        background: '#ddd',
      }}
    >
      <BottomNavigationAction
        value="/"
        icon={<HomeIcon fontSize="large" />}
        onClick={() => onLink('/')}
      />
      <BottomNavigationAction
        value="/selectpic"
        icon={<CameraAltIcon fontSize="large" />}
        onClick={() => onLink('/selectpic')}
      />
      <BottomNavigationAction
        value="/user"
        icon={<AccountCircleIcon fontSize="large" />}
        onClick={() => onLink('/user')}
      />
    </BottomNavigation>
  );
}
