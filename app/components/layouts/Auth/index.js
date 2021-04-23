import React from 'react';

import Header from '../../modules/Header';
import Footer from '../../modules/Footer';

const Auth = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Auth;
