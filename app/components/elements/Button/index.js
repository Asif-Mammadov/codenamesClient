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
  img,
  type,
  style,
  clicked
}) => {
  let content;
  const mediaOptions = {
    width: small ? 24 : 32,
    height: small ? 24 : 32
  };

  // Handle image and icons
  if (icon) {
    content = <Icon name={icon} {...mediaOptions} />;
  }
  if (img) {
    content = <img src={`/img/${img}.png`} {...mediaOptions} />;
  }

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
    >
      {content}
      <span style={{ marginLeft: 8 }}>{children}</span>
    </button>
  );
};

export default Button;
