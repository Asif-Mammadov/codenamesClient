import React, { useState } from 'react';
import { Link } from 'react-scroll';

import styles from './HomeLink.module.scss';

const HomeLink = ({ children, to, clicked }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      className={[styles.homeLink, isActive ? styles.active : ''].join(' ')}
      onSetActive={() => setIsActive(true)}
      onSetInactive={() => setIsActive(false)}
      spy={true}
      smooth={true}
      duration={500}
      to={to}
      onClick={clicked}
    >
      {children}
    </Link>
  );
};

export default HomeLink;
