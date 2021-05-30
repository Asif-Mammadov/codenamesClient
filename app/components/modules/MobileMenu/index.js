import React from 'react';
import Link from 'next/link';
import { HOME_LINKS, ACCOUNT_LINKS } from '../../../data/links';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import NavLink from '../../elements/NavLink';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ show, isActive, onClose, isAccount, translate }) => {
  return show ? (
    <section className={[styles.menu, isActive ? styles.active : ''].join(' ')}>
      <div>
        {(isAccount ? ACCOUNT_LINKS : HOME_LINKS).map((link) => (
          <NavLink
            key={link.name}
            clicked={() => onClose()}
            href={`${!isAccount ? '/#' : ''}${link.href}`}
          >
            {translate(link.name)}
          </NavLink>
        ))}
      </div>

      <div className={styles.menuOptions}>
        <div className={styles.langDropdown}>
          <Dropdown
            items={LANGS}
            onChange={onClose}
            translate={translate}
            lang
          />
        </div>

        {isAccount ? (
          <div className={styles.accountButtons}>
            <Link href="/game">
              <a style={{ marginBottom: 16 }}>
                <Button icon="play-cards" type="white" small>
                  {translate('play')}
                </Button>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <Button icon="out" small>
                  {translate('sign_out')}
                </Button>
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.homeButtons}>
            <Link href="/login">
              <a style={{ marginRight: 24 }}>
                <Button type="white">{translate('login')}</Button>
              </a>
            </Link>
            <Link href="/register">
              <a style={{ marginRight: 0 }}>
                <Button>{translate('register')}</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  ) : null;
};

export default MobileMenu;
