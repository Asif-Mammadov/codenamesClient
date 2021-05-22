import Link from 'next/link';
import React, { useEffect } from 'react';
import { ACCOUNT_LINKS } from '../../../data/links';
import { HOME_LINKS, LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import NavLink from '../../elements/NavLink';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ show, isActive, onClose, isAccount }) => {
  const classNames = [styles.menu];

  // Add active class if MobileMenu is active
  if (isActive) {
    classNames.push(styles.active);
  }

  return show ? (
    <section className={classNames.join(' ')}>
      <div>
        {(isAccount ? ACCOUNT_LINKS : HOME_LINKS).map((link) => (
          <NavLink
            key={link.name}
            clicked={() => onClose()}
            href={`${!isAccount ? '/#' : ''}${link.href}`}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.menuOptions}>
        <div className={styles.langDropdown}>
          <Dropdown items={LANGS} />
        </div>

        {isAccount ? (
          <div className={styles.accountButtons}>
            <Link href="/game">
              <a style={{ marginBottom: 16 }}>
                <Button icon="play-cards" type="white" small>
                  Play
                </Button>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <Button icon="out" small>
                  Sign Out
                </Button>
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.homeButtons}>
            <Link href="/login">
              <a style={{ marginRight: 24 }}>
                <Button type="white" style={{ width: 140 }}>
                  Login
                </Button>
              </a>
            </Link>
            <Link href="/register">
              <a>
                <Button style={{ width: 140 }}>Register</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  ) : null;
};

export default MobileMenu;
