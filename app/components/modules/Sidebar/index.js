import React from 'react';
import { ACCOUNT_LINKS } from '../../../data/links';
import SidebarLink from '../../elements/SidebarLink';

import styles from './Sidebar.module.scss';

const Sidebar = ({ show, translate }) => {
  return show ? (
    <section className={styles.sidebar}>
      <div className={styles.links}>
        {ACCOUNT_LINKS.map((link) => (
          <SidebarLink key={link.name} href={link.href} icon={link.icon}>
            {translate(link.name)}
          </SidebarLink>
        ))}
      </div>

      <SidebarLink href="/login" icon="out">
        {translate('sign_out')}
      </SidebarLink>
    </section>
  ) : null;
};

export default Sidebar;
