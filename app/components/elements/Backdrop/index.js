import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = ({ onClose }) => {
  return (
    <div onClick={() => onClose()} className={styles.backdrop}>
      hello
    </div>
  );
};

export default Backdrop;
