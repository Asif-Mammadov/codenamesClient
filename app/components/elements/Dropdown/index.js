import React, { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import Icon from '../Icon';
import styles from './Dropdown.module.scss';
import DropdownItem from './DropdownItem';
import utils from '../../../utils';

const Dropdown = ({ items, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Set the first one active
  const [activeItem, setActiveItem] = useState(items[0]);
  const [openUpward, setOpenUpward] = useState(false);

  const dropdownMenu = useRef(null);

  // If menu is off screen, open it upward
  useEffect(() => setOpenUpward(!utils.isInViewport(dropdownMenu)), [
    dropdownMenu
  ]);

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
          <DropdownItem isButton icon={activeItem.icon}>
            {name || activeItem.name}
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
          {items.map((item) =>
            // Don't add to menu if active
            item.name !== activeItem.name ? (
              <button
                onClick={() => onItemSelected(item)}
                key={item.name}
                className={styles.menuItem}
              >
                <DropdownItem icon={item.icon}>{item.name}</DropdownItem>
              </button>
            ) : null
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
