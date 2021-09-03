import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Welcome to webapp2!</title>
    </Head>
    <div className="app">
      <header className="flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nx-logo-white.svg" alt="Nx logo" width="75" height="50" />
        <h1>Welcome to webapp2!</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  </>
  );
}

export default App;
