/* eslint-disable react/prop-types */
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Container } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fitapat',
  description: 'Fit a pat : Show your workout progress',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Container sx={{ height: '100%' }}>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
