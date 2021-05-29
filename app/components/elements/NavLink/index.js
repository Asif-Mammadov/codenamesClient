import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './NavLink.module.scss';

const NavLink = ({ children, href, clicked }) => {
  const router = useRouter();

  const classNames = [styles.navLink];

  // Add active class if link is active
  if (router.asPath === href) {
    classNames.push(styles.active);
  }

  return (
    <Link href={href}>
      <a onClick={clicked} className={classNames.join(' ')}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
