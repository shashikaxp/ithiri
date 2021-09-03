import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
  
    </Head>
    <div className="app">
      <header className="flex">            
      </header>
      <main>
        <div className="text-center text-6xl">
        Almost before we knew it, we had left the ground.
        </div>
        <Component {...pageProps} />
      </main>
    </div>
  </>
  );
}

export default App;
