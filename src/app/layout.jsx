/* eslint-disable react/prop-types */
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Container } from '@mui/material';
import Header from '../components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fitapat',
  description: 'Fit a pat : Show your workout progress',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
