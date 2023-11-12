'use client';

import { React, useState, useEffect } from 'react';
import {} from 'fabric';

import { Box } from '@mui/material';
import styles from './page.module.css';

export default function Canvas() {
  return (
    <Box className={styles.container}>
      <canvas id="myCanvas" width={500} height={500} />
    </Box>
  );
}
