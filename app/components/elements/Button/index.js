import React from 'react';
import Icon from '../Icon';
import styles from './Button.module.scss';

const Button = ({
  children,
  small,
  extraSmall,
  big,
  shadow,
  icon,
  type,
  style,
  disabled,
  clicked
}) => {
  let content;
  return (
    <button
      className={[
        styles.button,
        big ? styles.big : '',
        small ? styles.small : '',
        extraSmall ? styles.extraSmall : '',
        type ? styles[type] : '',
        shadow ? styles.shadow : ''
      ].join(' ')}
      style={style}
      onClick={clicked}
      disabled={disabled}
    >
      {content}
      {icon ? (
        <Icon
          name={icon}
          style={
            children
              ? {
                  marginRight: 8
                }
              : null
          }
        />
      ) : null}
      <span>{children || ''}</span>
    </button>
  );
};

export default Button;
