import { type AppType } from "next/app";
import { api } from "y/utils/api";
import "y/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "y/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
