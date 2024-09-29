'use client';

import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const isDevMode = process.env.NODE_ENV !== 'production';

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={isDevMode} />
      </QueryClientProvider>
    </div>
  );
};
