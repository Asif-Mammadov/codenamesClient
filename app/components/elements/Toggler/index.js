import React, { useState } from 'react';

import styles from './Toggler.module.scss';

const Toggler = ({ onToggle }) => {
  // Create an array of classes
  const [togglerClasses, setTogglerClasses] = useState([styles.toggler]);

  const onToggleHandler = () => {
    const isActive = togglerClasses.includes(styles.isActive);

    // If not active, set active
    if (!isActive) {
      setTogglerClasses([styles.toggler, styles.isActive]);
    } else {
      setTogglerClasses([styles.toggler]);
    }

    // Pass updated value to parent
    onToggle(!isActive);
  };

  return (
    <button onClick={onToggleHandler} className={togglerClasses.join(' ')}>
      <span className={styles.togglerBox}>
        <span className={styles.togglerInner}></span>
      </span>
    </button>
  );
};

export default Toggler;
