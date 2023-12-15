/* eslint-disable react/prop-types */

'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

export default function AuthSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
