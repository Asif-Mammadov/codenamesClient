import Link from 'next/link';
import React from 'react';
import { HOME_LINKS, LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import NavLink from '../../elements/NavLink';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ show, isActive, onClose }) => {
  const classNames = [styles.menu];

  // Add active class if MobileMenu is active
  if (isActive) {
    classNames.push(styles.active);
  }

  return show ? (
    <section className={classNames.join(' ')}>
      <div>
        {HOME_LINKS.map((link) => (
          <NavLink
            key={link.name}
            clicked={() => onClose()}
            href={`/#${link.href}`}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.menuOptions}>
        <div className={styles.langDropdown}>
          <Dropdown items={LANGS} />
        </div>
        <div className={styles.buttons}>
          <Link href="/login">
            <a>
              <Button type="white" style={{ width: 140, marginRight: 24 }}>
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
      </div>
    </section>
  ) : null;
};

export default MobileMenu;
