import { api } from "y/utils/api";
import "y/styles/globals.css";
import Layout from "y/components/Layout";
import type { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import PublicLayout from "y/components/PublicLayout";
import GoogleTagManager from "y/components/shared/GoogleTag";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { GeistSans } from "geist/font/sans";

export type MyAppProps = AppProps & {
  session: Session;
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: string;
  };
};

function MyApp({ Component, session, pageProps }: MyAppProps) {
  const MainLayout = Component.Layout === "public" ? PublicLayout : Layout;
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <GoogleTagManager />
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}
export default api.withTRPC(MyApp);
