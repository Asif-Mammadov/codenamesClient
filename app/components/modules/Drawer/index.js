import React from 'react';

import { HOME_LINKS } from '../../../data/links';
import HomeLink from '../../elements/HomeLink';
import Icon from '../../elements/Icon';
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
          <HomeLink clicked={() => onClose()} key={link.href} to={link.href}>
            {link.name}
          </HomeLink>
        ))}
      </div>

      <div className={styles.drawerLangDropdown}>Language dropdown</div>
    </section>
  ) : null;
};

export default Drawer;
