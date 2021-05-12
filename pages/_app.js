// Add global reset stylings
import Head from 'next/head';
import '../app/styles/base/_reset.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Here we will have meta tags for SEO */}
        <title>Codenames</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
