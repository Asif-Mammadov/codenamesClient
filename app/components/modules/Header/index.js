import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ACCOUNT_LINKS } from '../../../data/links';
import { LANGS } from '../../../data/main';
import { useScrollPositions } from '../../../hooks/useScrollPositions';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Backdrop from '../../elements/Backdrop';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import Toggler from '../../elements/Toggler';
import Drawer from '../Drawer';
import MobileMenu from '../MobileMenu';
import styles from './Header.module.scss';

const Header = ({ logoDark, togglerDark, isAccount }) => {
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

  // Render different versions of header
  return isAccount ? (
    <>
      <header
        className={[
          styles.accountHeader,
          isToggleOn && width <= 992 ? styles.mobileActive : ''
        ].join(' ')}
      >
        <div className={styles.leftWrapper}>
          <Link href="/">
            <a>
              <img className={styles.logo} src="/logo-dark.svg" />
            </a>
          </Link>
          <div className={styles.dropdown}>
            <Dropdown items={LANGS} />
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <div className={styles.buttons}>
            <Link href="/game">
              <a>
                <Button icon="cards-orange" type="white" small>
                  Play
                </Button>
              </a>
            </Link>
            <div className={styles.dropdown}>
              <Dropdown name="Eyvaz" img="avatar" items={ACCOUNT_LINKS} />
            </div>
          </div>
          <div className={styles.mobileButton}>
            <Button
              clicked={() => setIsToggleOn((prevState) => !prevState)}
              img="avatar"
              type="white"
              style={{ border: 'none' }}
            >
              Eyvaz
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu show={width <= 992} onClose={close} isActive={isToggleOn} />
    </>
  ) : (
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
              src={`/logo-${
                (isToggleOn && width <= 992) || logoDark ? 'dark' : 'light'
              }.svg`}
            />
          </a>
        </Link>

        <Toggler
          isActive={isToggleOn && width <= 992} // Don's show close icon on desktop
          onToggle={() => setIsToggleOn((prevState) => !prevState)}
          dark={togglerDark}
        />
      </header>

      <Drawer show={width > 992} onClose={close} isActive={isToggleOn} />
      <MobileMenu show={width <= 992} onClose={close} isActive={isToggleOn} />

      {isToggleOn ? <Backdrop onClose={close} /> : null}
    </>
  );
};

export default Header;
