import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = ({ onClose }) => {
  return <div onClick={() => onClose()} className={styles.backdrop}></div>;
};

export default Backdrop;
