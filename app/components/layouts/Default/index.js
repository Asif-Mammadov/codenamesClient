import React from 'react';
import Footer from '../../modules/Footer';
import Header from '../../modules/Header';

const Default = (props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Default;
