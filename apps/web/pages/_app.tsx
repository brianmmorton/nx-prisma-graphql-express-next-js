import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import './styles.css';
import 'antd/dist/reset.css';
import { Navigation } from '../components/Navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DehydratedState, Hydrate, QueryClientProvider, QueryClient } from '@tanstack/react-query';

type ReactQueryProps = {
  pageProps: {
    dehydratedState: DehydratedState;
  };
};

function CustomApp({ Component, pageProps }: AppProps & ReactQueryProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <Navigation />
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
