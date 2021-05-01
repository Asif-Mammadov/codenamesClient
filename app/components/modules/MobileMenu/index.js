import React, { useState } from 'react';

import styles from './MobileMenu.module.scss';
import { HOME_LINKS } from '../../../data/links';
import NavLink from '../../elements/NavLink';

const MobileMenu = ({ show, isActive }) => {
  const classNames = [styles.menu];

  // Add active class if MobileMenu is active
  if (isActive) {
    classNames.push(styles.active);
  }

  return show ? (
    <section className={classNames.join(' ')}>
      <div>
        {HOME_LINKS.map((link) => (
          <NavLink href={link.href} key={link.href}>
            {link.name}
          </NavLink>
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
