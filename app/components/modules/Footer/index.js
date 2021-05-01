import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section>
        <span className={styles.codenames}>© CODENAMES 2021:</span>
        <span> All rights are reserved.</span>
      </section>

      <section>Made from Azerbaijan</section>
    </footer>
  );
};

export default Footer;
