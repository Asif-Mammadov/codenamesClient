import React from 'react';

import Icon from '../../Icon';
import styles from './DropdownItem.module.scss';

const DropdownItem = ({ children, icon, isButton }) => (
  <div
    className={[styles.dropdownItem, isButton ? styles.isButton : ''].join(' ')}
  >
    {icon ? (
      <Icon name={icon} width="24" height="24" style={{ marginRight: 8 }} />
    ) : null}
    <span>{children}</span>
  </div>
);

export default DropdownItem;
