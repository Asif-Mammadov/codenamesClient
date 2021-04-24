import React, { useState } from 'react';
import Link from 'next/link';

import Toggler from '../../elements/Toggler';
import styles from './Header.module.scss';
import Drawer from '../Drawer';
import Backdrop from '../../elements/Backdrop';
import MobileMenu from '../MobileMenu';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const Header = ({}) => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { width } = useWindowDimensions();

  const classNames = [styles.header];

  // Change header style when active on mobile
  if (isToggleOn && width <= 992) {
    classNames.push(styles.mobileActive);
  }

  // A utility function to set toggle off
  const close = () => setIsToggleOn(false);

  return (
    <>
      <header className={classNames.join(' ')}>
        <Link href="/">
          <a>
            <img
              className={styles.logo}
              src={`/logo-${isToggleOn && width <= 992 ? 'dark' : 'light'}.svg`}
            />
          </a>
        </Link>

        <Toggler
          isActive={isToggleOn && width <= 992} // Don's show close icon on desktop
          onToggle={() => setIsToggleOn((prevState) => !prevState)}
        />
      </header>

      <Drawer show={width > 992} onClose={close} isActive={isToggleOn} />
      <MobileMenu show={width <= 992} isActive={isToggleOn} />

      {isToggleOn ? <Backdrop onClose={close} /> : null}
    </>
  );
};

export default Header;
