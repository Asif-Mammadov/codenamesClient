import React, { useEffect } from 'react';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { wrapper } from '../app/store';

// Add global reset styles
import '../app/styles/base/_reset.scss';
// Vendor styles
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  useEffect(() => {
    // Change text direction to rtl if arabic is selected
    if (locale === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale]);

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

export default appWithTranslation(wrapper.withRedux(MyApp));
