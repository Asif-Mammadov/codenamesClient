import Head from 'next/head';

// Add global reset stylings
import '../app/styles/base/_reset.scss';

// Vendor
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';

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
