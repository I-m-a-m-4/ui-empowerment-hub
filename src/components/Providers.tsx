'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider } from '@/components/CartProvider';
import NextTopLoader from 'nextjs-toploader';
import Cursor from '@/components/Cursor';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <Cursor />
        {children}
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  );
}
