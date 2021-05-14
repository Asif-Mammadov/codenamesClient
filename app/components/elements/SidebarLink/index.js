import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Icon from '../Icon';
import styles from './SidebarLink.module.scss';

const SidebarLink = ({ children, href, clicked, icon }) => {
  const router = useRouter();

  const classNames = [styles.sidebarLink];

  // Add active class if link is active
  if (router.asPath === href) {
    classNames.push(styles.active);
  }

  return (
    <Link href={href}>
      <a onClick={clicked} className={classNames.join(' ')}>
        <Icon name={icon} width="24" height="24" style={{ marginRight: 8 }} />
        <span>{children}</span>
      </a>
    </Link>
  );
};

export default SidebarLink;
