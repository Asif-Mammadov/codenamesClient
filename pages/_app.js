// Add global reset stylings
import '../app/styles/base/_reset.scss';

import Head from 'next/head';

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
