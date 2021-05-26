import Head from 'next/head';
import { Provider } from 'react-redux';
import { useStore } from '../app/store';

// Add global reset stylings
import '../app/styles/base/_reset.scss';

// Vendor
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        {/* Here we will have meta tags for SEO */}
        <title>Codenames</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
