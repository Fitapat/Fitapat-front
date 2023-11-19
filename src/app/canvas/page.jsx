'use client';

import { React, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Box, Button, ButtonGroup } from '@mui/material';
import styles from './page.module.css';
import FabricCanvas from './fabric';
import Link from 'next/link';

export default function Canvas() {
  return (
    <div className={styles.container}>
      <Box className={styles.canvas}>
        <FabricCanvas />
      </Box>
      {/* <Box className={styles.bottomButtons} spacing="0.5rem">
        <Button variant="outlined">
          <Link
            href={{
              pathname: `/selectpic`,
            }}
          >
            이전
          </Link>
        </Button>
        <Button variant="outlined">저장</Button>
      </Box> */}
    </div>
  );
}
