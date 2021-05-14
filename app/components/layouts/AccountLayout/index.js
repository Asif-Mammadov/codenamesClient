import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Header from '../../modules/Header';
import Sidebar from '../../modules/Sidebar';

import styles from './AccountLayout.module.scss';

const AccountLayout = (props) => {
  // Get window width
  const { width } = useWindowDimensions();

  return (
    <>
      <Header isAccount />
      <Sidebar show={width > 992} />
      <main className={styles.accountContent}>{props.children}</main>
    </>
  );
};

export default AccountLayout;
