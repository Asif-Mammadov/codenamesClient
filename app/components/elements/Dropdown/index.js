import React, { useEffect, useMemo, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from '../Icon';
import styles from './Dropdown.module.scss';
import DropdownItem from './DropdownItem';
import utils from '../../../utils';
import colors from '../../../constants/colors';

const Dropdown = ({
  items,
  name,
  icon,
  img,
  upward,
  light,
  lang,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0]);
  const [openUpward, setOpenUpward] = useState(null);
  const { locale, asPath, push } = useRouter();

  const dropdownMenu = useRef(null);

  useEffect(() => {
    // If menu is off screen, open it upward
    setOpenUpward(upward || !utils.isInViewport(dropdownMenu));

    if (lang) {
      setActiveItem(items.find((item) => item.icon === locale));
    }
  }, [dropdownMenu, upward, lang]);

  const onItemSelected = (item) => {
    setIsOpen(false);

    // Set active item after menu closes
    setTimeout(() => {
      setActiveItem(item);

      if (lang) {
        push(asPath.indexOf('#') === -1 ? asPath : '/', undefined, {
          locale: item.icon
        });
      }
      // Send active item to parent
      if (onChange) {
        onChange(item);
      }
    }, 500);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className={[styles.dropdown, isOpen ? styles.open : ''].join(' ')}>
        {/* Dropdown button */}
        <div
          className={[styles.buttonWrapper, light ? styles.light : ''].join(
            ' '
          )}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <DropdownItem
            isButton
            icon={icon || activeItem?.icon}
            color={light ? 'white' : colors.primary}
            img={img}
          >
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
                if (!item.href) {
                  // Don't add to menu if active
                  return item.name !== activeItem?.name ? (
                    <button
                      onClick={() => onItemSelected(item)}
                      type="button"
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
                      className={[
                        styles.menuItem,
                        asPath === item.href ? styles.active : ''
                      ].join(' ')}
                      onClick={() => setIsOpen(false)}
                    >
                      <DropdownItem>{item.name}</DropdownItem>
                    </a>
                  </Link>
                );
              }),
            [activeItem]
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
