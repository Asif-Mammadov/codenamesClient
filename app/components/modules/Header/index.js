import React, { useState } from 'react';
import Link from 'next/link';

import Toggler from '../../elements/Toggler';
import styles from './Header.module.scss';
import Drawer from '../Drawer';
import Backdrop from '../../elements/Backdrop';

const Header = (props) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  // A utility function to set toggle off
  const close = () => setIsToggleOn(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img className={styles.logo} src="/logo-light.svg" />
          </a>
        </Link>
        <Toggler
          isActive={isToggleOn}
          onToggle={() => setIsToggleOn((prevState) => !prevState)}
        />
      </header>

      <Drawer onClose={close} isActive={isToggleOn} />
      {isToggleOn ? <Backdrop onClose={close} /> : null}
    </>
  );
};

export default Header;
