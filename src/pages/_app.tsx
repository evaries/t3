import { api } from "y/utils/api";
import "y/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "y/components/Layout";
import type { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import PublicLayout from "y/components/PublicLayout";

export type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: string;
  };
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const MainLayout = Component.Layout === "public" ? PublicLayout : Layout;
  return (
    <ClerkProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ClerkProvider>
  );
}
export default api.withTRPC(MyApp);
