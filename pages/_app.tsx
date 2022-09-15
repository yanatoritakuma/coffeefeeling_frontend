import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import axios from "axios";
import { Layout } from "../components/layout/Layout";
import { Userprovider } from "../providers/Userprovider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      axios.defaults.headers.common["csrf-token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Userprovider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Userprovider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
