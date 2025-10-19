'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/layout/ThemeContext';
import { AuthProvider } from '../context/AuthProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}