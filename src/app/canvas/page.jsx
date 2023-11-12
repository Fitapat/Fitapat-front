'use client';

import { React, useState, useEffect } from 'react';
import { fabric } from 'fabric';

import { Button, Box } from '@mui/material';
import styles from './page.module.css';

export default function Canvas() {
  const canvas = new fabric.Canvas('canvas');
  canvas.renderAll();

  return (
    <Box className={styles.container}>
      <Box backgroundColor="red" width={'50px'} height={'50px'}></Box>
    </Box>
  );
}
