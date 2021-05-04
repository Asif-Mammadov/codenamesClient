import React from 'react';

import styles from './MobileMenu.module.scss';
import { HOME_LINKS, LANGS } from '../../../data/main';
import HomeLink from '../../elements/HomeLink';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';

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
          <HomeLink clicked={() => onClose()} key={link.href} to={link.href}>
            {link.name}
          </HomeLink>
        ))}
      </div>

      <div className={styles.menuOptions}>
        <div className={styles.langDropdown}>
          <Dropdown items={LANGS} />
        </div>
        <div className={styles.buttons}>
          <Button type="white" style={{ width: 140, marginRight: 24 }}>
            Login
          </Button>
          <Button style={{ width: 140 }}>Register</Button>
        </div>
      </div>
    </section>
  ) : null;
};

export default MobileMenu;
