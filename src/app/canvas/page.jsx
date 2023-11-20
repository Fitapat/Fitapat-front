'use client';

import { React, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Box, Button, ButtonGroup } from '@mui/material';
import styles from './page.module.css';
import FabricCanvas from './fabric';
import Link from 'next/link';

export default function Canvas() {
  return <FabricCanvas />;
}
