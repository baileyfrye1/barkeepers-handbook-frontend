// app/routes/__root.tsx
import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import { Toaster } from 'sonner';

import appCss from '@/styles/app.css?url';
import { QueryClient } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/tanstack-react-start';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'TanStack Start Starter',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }),
    component: RootComponent,
  },
);

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          <Navbar />
          {children}
          <Scripts />
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
