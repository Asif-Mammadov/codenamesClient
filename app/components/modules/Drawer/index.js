import React, { useState } from 'react';
import { DRAWER_LINKS } from '../../data/modules';
import Icon from '../../elements/Icon';
import NavLink from '../../elements/NavLink';

import styles from './Drawer.module.scss';

const Drawer = ({ isActive, onClose }) => {
  const classNames = [styles.drawer];

  // Add active class if drawer is active
  if (isActive) {
    classNames.push(styles.active);
  }

  return (
    <section className={classNames.join(' ')}>
      <div className={styles.drawerButtons}>
        <button onClick={() => onClose()} className={styles.closeButton}>
          <Icon name="close" width="40" height="40" />
        </button>
        <div>Auth buttons</div>
      </div>

      <div className={styles.drawerLinks}>
        {DRAWER_LINKS.map((link) => (
          <NavLink href={link.href} key={link.href}>
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.drawerLangDropdown}>Language dropdown</div>
    </section>
  );
};

export default Drawer;
