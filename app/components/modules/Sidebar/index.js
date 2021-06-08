import React from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_LINKS } from '../../../data/links';
import SidebarLink from '../../elements/SidebarLink';
import { signOut } from '../../../store/actions/Auth';
import styles from './Sidebar.module.scss';

const Sidebar = ({ show, translate, signOut }) => {
  return show ? (
    <section className={styles.sidebar}>
      <div className={styles.links}>
        {ACCOUNT_LINKS.map((link) => (
          <SidebarLink key={link.name} href={link.href} icon={link.icon}>
            {translate(link.name)}
          </SidebarLink>
        ))}
      </div>

      <SidebarLink href="/login" clicked={() => signOut()} icon="out">
        {translate('sign_out')}
      </SidebarLink>
    </section>
  ) : null;
};

export default connect(null, { signOut })(Sidebar);
