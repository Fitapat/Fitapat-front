'use client';

import { useRouter, usePathname } from 'next/navigation';

import { React } from 'react';
import { Box, Button } from '@mui/material';

export default function Header() {
  const pathname = usePathname();

  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };

  if (pathname == '/start' || pathname == '/canvas') {
    return <></>;
  }

  return (
    <Box
      sx={{
        top: 0,
        width: '100%',
        p: 1,
      }}
    >
      <Button color={'inherit'} variant="text" onClick={() => onLink('/')}>
        Fitapat
      </Button>
    </Box>
  );
}
