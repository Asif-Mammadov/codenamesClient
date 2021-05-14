import React from 'react';
import Footer from '../../modules/Footer';
import Header from '../../modules/Header';

const DefaultLayout = (props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default DefaultLayout;
