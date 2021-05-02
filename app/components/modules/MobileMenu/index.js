import React, { useState } from 'react';

import styles from './MobileMenu.module.scss';
import { HOME_LINKS } from '../../../data/links';
import HomeLink from '../../elements/HomeLink';

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
        <div className={styles.langDropdown}>Language dropdown</div>
        <div className={styles.buttons}>Menu Buttons</div>
      </div>
    </section>
  ) : null;
};

export default MobileMenu;
