import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HOME_LINKS } from '../../../data/links';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import Icon from '../../elements/Icon';
import NavLink from '../../elements/NavLink';
import styles from './Drawer.module.scss';

const Drawer = ({ show, isActive, onClose, translate }) => {
  return show ? (
    <section
      className={[styles.drawer, isActive ? styles.active : ''].join(' ')}
    >
      <div className={styles.drawerButtons}>
        <button onClick={() => onClose()} className={styles.closeButton}>
          <Icon name="close" width="40" height="40" />
        </button>
        <div className={styles.auth}>
          <Link href="/login">
            <a>
              <Button type="white" style={{ marginRight: 24 }}>
                {translate('login')}
              </Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button>{translate('register')}</Button>
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
            {translate(link.name)}
          </NavLink>
        ))}
      </div>

      <div className={styles.drawerLangDropdown}>
        <Dropdown items={LANGS} onChange={onClose} lang />
      </div>
    </section>
  ) : null;
};

export default Drawer;
