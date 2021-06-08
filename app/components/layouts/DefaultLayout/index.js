import React from 'react';
import Footer from '../../modules/Footer';
import Header from '../../modules/Header';

const DefaultLayout = ({ children, translate }) => (
  <>
    <Header translate={translate} />
    <main>{children}</main>
    <Footer translate={translate} />
  </>
);

export default DefaultLayout;
