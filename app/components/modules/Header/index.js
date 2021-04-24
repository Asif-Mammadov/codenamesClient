import React, { useState } from 'react';
import Link from 'next/link';

import Toggler from '../../elements/Toggler';
import styles from './Header.module.scss';
import Icon from '../../elements/Icon';

const Header = (props) => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  console.log(isToggleOn);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img className={styles.logo} src="/logo-light.svg" />
        </a>
      </Link>
      <Toggler onToggle={() => setIsToggleOn((prevState) => !prevState)} />
    </header>
  );
};

export default Header;
