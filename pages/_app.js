import React, { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { wrapper } from '../app/store';

// Add global reset styles
import '../app/styles/base/_reset.scss';
// Vendor styles
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';
import { SocketProvider } from '../app/contexts/SocketProvider';

// SEO configuration
const seoConfig = {
  title: 'Codenames',
  description:
    'Codenames is a 2015 card game for 4-8 players, designed by Vlaada Chvátil and published by the Czech Games Edition. The two teams compete, each giving a word of advice that can point to many words on the "spymaster" board. Other players on the team try to guess the words of their team while avoiding the words of the other team.',
  openGraph: {
    type: 'website',
    url: 'https://example.com/',
    title: 'Codenames',
    description: 'Codenames',
    images: [
      {
        url: 'https://example.com/img/home-bg-1.png',
        width: 800,
        height: 600,
        alt: 'Codenames'
      }
    ],
    site_name: 'example.com'
  }
};

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
      <DefaultSeo {...seoConfig} />
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
