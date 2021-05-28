import React from 'react';

import styles from './Footer.module.scss';

const Footer = ({ translate }) => {
  return (
    <footer className={styles.footer}>
      <section>
        <span className={styles.codenames}>© CODENAMES 2021: </span>
        <span>{translate('rights_reserved')}</span>
      </section>

      <section>{translate('made_from')}</section>
    </footer>
  );
};

export default Footer;
