'use client';

import { React } from 'react';
import FabricCanvas from '../../components/canvas/fabricCanvas';
import { Box } from '@mui/material';

export default function Canvas() {
  return (
    <Box
      sx={{
        width: 1,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <FabricCanvas />
    </Box>
  );
}
