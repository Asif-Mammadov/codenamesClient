import '../app/styles/app.scss'; // Add global stylings

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Codenames</title>
        {/* Here we will have meta tags for SEO */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
