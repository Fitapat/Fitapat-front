/* eslint-disable react/prop-types */
import React from 'react';
import { Inter } from 'next/font/google';
import { Container } from '@mui/system';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fitapat',
  description: 'Fit a pat : Show your workout progress',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
