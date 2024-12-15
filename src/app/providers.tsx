// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import StyledComponentsRegistry from '@/lib/registry';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
