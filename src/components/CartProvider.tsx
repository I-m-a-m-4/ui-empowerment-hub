
'use client';

import { CartProvider as USCProvider } from 'use-shopping-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <USCProvider
      mode="client-only"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_URL}/`}
      currency="USD"
      allowedCountries={['US', 'GB', 'CA', 'NG']}
      billingAddressCollection={false}
      shouldPersist={true}
    >
      {children}
    </USCProvider>
  );
}
