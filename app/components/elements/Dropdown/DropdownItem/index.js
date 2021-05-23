import React from 'react';

import Icon from '../../Icon';
import styles from './DropdownItem.module.scss';

const DropdownItem = ({ children, icon, img, isButton }) => {
  let content;
  const mediaOptions = {
    width: 24,
    height: 24,
    style: { marginRight: 8 }
  };

  // Handle image and icons
  if (icon) {
    content = <Icon name={icon} {...mediaOptions} />;
  }
  if (img) {
    content = <img src={`/img/${img}.png`} {...mediaOptions} />;
  }

  return (
    <div
      className={[styles.dropdownItem, isButton ? styles.isButton : ''].join(
        ' '
      )}
    >
      {content}
      <span>{children}</span>
    </div>
  );
};

export default DropdownItem;
