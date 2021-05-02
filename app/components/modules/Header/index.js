import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Toggler from '../../elements/Toggler';
import styles from './Header.module.scss';
import Drawer from '../Drawer';
import Backdrop from '../../elements/Backdrop';
import MobileMenu from '../MobileMenu';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useScrollPositions } from '../../../hooks/useScrollPositions';

const Header = ({}) => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isScrollOn, setIsScrollOn] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { width } = useWindowDimensions();

  useScrollPositions(
    ({ prevPos, currPos }) => {
      // Hide header on scroll down
      const show = currPos.y < prevPos.y && isScrollOn;
      if (show !== isHidden) setIsHidden(show);
    },
    [isHidden, isScrollOn]
  );

  // A utility function to set toggle off
  const close = () => setIsToggleOn(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      // Set scroll on as soon as scroll starts
      setIsScrollOn(window.scrollY > 50)
    );

    // Disable scroll when mobile active
    document.body.style.overflow =
      isToggleOn && width <= 992 ? 'hidden' : 'auto';
  }, [width, isToggleOn]);

  return (
    <>
      <header
        className={[
          styles.header,
          isToggleOn && width <= 992 ? styles.mobileActive : '',
          isScrollOn ? styles.scrollOn : '',
          isHidden ? styles.hidden : ''
        ].join(' ')}
      >
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
      <MobileMenu show={width <= 992} onClose={close} isActive={isToggleOn} />

      {isToggleOn ? <Backdrop onClose={close} /> : null}
    </>
  );
};

export default Header;
