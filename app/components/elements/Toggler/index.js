import React from 'react';
import styles from './Toggler.module.scss';

const Toggler = ({ isActive, onToggle, dark }) => (
  <button
    onClick={() => onToggle()}
    className={[
      styles.toggler,
      isActive ? styles.active : '',
      dark ? styles.dark : ''
    ].join(' ')}
  >
    <span className={styles.togglerBox}>
      <span
        className={styles.togglerInner}
        // Add dark styles if dark mode is on
      ></span>
    </span>
  </button>
);

export default Toggler;
