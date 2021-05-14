import React, { useEffect, useMemo, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import Icon from '../Icon';
import styles from './Dropdown.module.scss';
import DropdownItem from './DropdownItem';
import utils from '../../../utils';
import Link from 'next/link';

const Dropdown = ({ items, name, icon, img }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(items[0]);
  const [openUpward, setOpenUpward] = useState(false);

  const dropdownMenu = useRef(null);

  useEffect(
    () =>
      // If menu is off screen, open it upward
      setOpenUpward(!utils.isInViewport(dropdownMenu)),
    [dropdownMenu]
  );

  const onItemSelected = (item) => {
    setIsOpen(false);

    // Set active item after menu closes
    setTimeout(() => {
      setActiveItem(item);
    }, 500);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className={[styles.dropdown, isOpen ? styles.open : ''].join(' ')}>
        {/* Dropdown button */}
        <div
          className={styles.buttonWrapper}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <DropdownItem isButton icon={icon || activeItem?.icon} img={img}>
            {name || activeItem?.name}
          </DropdownItem>
          <Icon name="arrow-down" width="20" height="9" />
        </div>

        {/* Menu */}
        <div
          ref={dropdownMenu}
          className={[
            styles.dropdownMenu,
            openUpward ? styles.upward : ''
          ].join(' ')}
        >
          {useMemo(
            () =>
              items.map((item) => {
                // If item is not a link
                if (item.href == undefined) {
                  // Don't add to menu if active
                  return item.name !== activeItem?.name ? (
                    <button
                      onClick={() => onItemSelected(item)}
                      key={item.name}
                      className={styles.menuItem}
                    >
                      <DropdownItem icon={item.icon}>{item.name}</DropdownItem>
                    </button>
                  ) : null;
                }
                return (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={styles.menuItem}
                      onClick={() => setIsOpen(false)}
                    >
                      <DropdownItem>{item.name}</DropdownItem>
                    </a>
                  </Link>
                );
              }),
            [items]
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
