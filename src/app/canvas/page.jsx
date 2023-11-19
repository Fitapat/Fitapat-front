'use client';

import { React, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Box } from '@mui/material';
import styles from './page.module.css';

export default function Canvas() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let canvas = new fabric.Canvas('myCanvas');

    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 50,
      height: 50,
    });
    canvas.add(rect);
  }, [isClient]);

  return isClient ? (
    <Box className={styles.container}>
      <canvas id="myCanvas" width={500} height={500} />
    </Box>
  ) : null;
}
