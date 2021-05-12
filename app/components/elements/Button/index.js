import React from 'react';
import Icon from '../Icon';
import styles from './Button.module.scss';

const Button = ({ children, big, shadow, icon, type, style }) => (
  <button
    className={[
      styles.button,
      big ? styles.big : '',
      type ? styles[type] : '',
      shadow ? styles.shadow : ''
    ].join(' ')}
    style={style}
  >
    {icon ? (
      <Icon name={icon} width="32" height="32" style={{ marginRight: 8 }} />
    ) : null}
    <span>{children}</span>
  </button>
);

export default Button;
