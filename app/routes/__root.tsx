// app/routes/__root.tsx
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "sonner";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import appCss from "@/styles/app.css?url";
import { QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { fetchUserId } from "@/lib/actions";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import Container from "@/components/Container";
import Footer from "@/components/Footer";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Barkeepers Handbook",
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    }),
    beforeLoad: async () => {
      const userId = await fetchUserId();

      return userId;
    },
    errorComponent: (props) => {
      return (
        <RootDocument>
          <DefaultCatchBoundary {...props} />
        </RootDocument>
      );
    },
    notFoundComponent: () => <NotFound />,
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
          <Container className="py-10">{children}</Container>
          <Footer />
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools position="bottom" />
          <Scripts />
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
