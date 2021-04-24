import React, { useState } from 'react';

import styles from './Toggler.module.scss';

const Toggler = ({ isActive, onToggle }) => {
  const classNames = [styles.toggler];

  // Add active class if toggle is active
  // Don't show close button on desktop
  if (isActive && window.innerWidth <= 992) {
    classNames.push(styles.active);
  }

  return (
    <button onClick={() => onToggle()} className={classNames.join(' ')}>
      <span className={styles.togglerBox}>
        <span className={styles.togglerInner}></span>
      </span>
    </button>
  );
};

export default Toggler;
