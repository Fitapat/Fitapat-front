import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import MuiCalendar from '@/components/calendar/muiCalendar';

export default function Home() {
  return (
    <>
      <MuiCalendar />
    </>
  );
}
