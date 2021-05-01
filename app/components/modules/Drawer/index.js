import React, { useState } from 'react';
import { HOME_LINKS } from '../../../data/links';
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
        <div>Auth buttons</div>
      </div>

      <div className={styles.drawerLinks}>
        {HOME_LINKS.map((link) => (
          <NavLink href={link.href} key={link.href}>
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.drawerLangDropdown}>Language dropdown</div>
    </section>
  ) : null;
};

export default Drawer;
