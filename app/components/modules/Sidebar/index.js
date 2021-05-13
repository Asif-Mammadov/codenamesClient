import React from 'react';

import styles from './Sidebar.module.scss';

const Sidebar = ({ show }) => {
  return show ? <section className={styles.sidebar}></section> : null;
};

export default Sidebar;
