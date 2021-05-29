import Link from 'next/link';
import React from 'react';
import { HOME_LINKS, LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import Icon from '../../elements/Icon';
import NavLink from '../../elements/NavLink';
import styles from './Drawer.module.scss';

const Drawer = ({ show, isActive, onClose }) => {
  const classNames = [styles.drawer];

  // Add active class if drawer is active
  if (isActive) {
    classNames.push(styles.active);
  }

  return show ? (
    <section className={classNames.join(' ')}>
      <div className={styles.drawerButtons}>
        <button onClick={() => onClose()} className={styles.closeButton}>
          <Icon name="close" width="40" height="40" />
        </button>
        <div className={styles.auth}>
          <Link href="/login">
            <a>
              <Button type="white" style={{ marginRight: 24 }}>
                Login
              </Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button>Register</Button>
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.drawerLinks}>
        {HOME_LINKS.map((link) => (
          <NavLink
            key={link.name}
            href={`/#${link.href}`}
            clicked={() => onClose()}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.drawerLangDropdown}>
        <Dropdown items={LANGS} />
      </div>
    </section>
  ) : null;
};

export default Drawer;
