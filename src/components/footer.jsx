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
    <BottomNavigation value={value}>
      <BottomNavigationAction
        value="/"
        icon={<HomeIcon />}
        onClick={() => onLink('/')}
      />
      <BottomNavigationAction
        value="/selectpic"
        icon={<CameraAltIcon />}
        onClick={() => onLink('/selectpic')}
      />
      <BottomNavigationAction
        value="/user"
        icon={<AccountCircleIcon />}
        onClick={() => onLink('/user')}
      />
    </BottomNavigation>
  );
}
