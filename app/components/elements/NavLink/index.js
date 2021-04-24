import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavLink.module.scss';

const NavLink = ({ children, href }) => {
  const router = useRouter();

  const classNames = [styles.navLink];

  // Add active class if link is active
  if (router.asPath === href) {
    classNames.push(styles.active);
  }

  return (
    <Link href={href}>
      <a className={classNames.join(' ')}>{children}</a>
    </Link>
  );
};

export default NavLink;
