import { AppProps } from 'next/app';
import Head from 'next/head';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import './styles.css';
import '@fontsource/roboto/300.css';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
