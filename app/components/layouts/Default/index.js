import React from 'react';

import Header from '../../modules/Header';
import Footer from '../../modules/Footer';

const Default = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Default;