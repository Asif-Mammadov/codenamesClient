import React from 'react';
import Icon from '../Icon';
import styles from './FormGroup.module.scss';

const FormGroup = ({ label, name, type, placeholder, icon, chat, style }) => (
  <div className={styles.formGroup} style={{ ...style }}>
    {label ? <label htmlFor={name}>{label}</label> : null}

    <div className={styles.inputWrapper}>
      {icon ? <Icon name={icon} width="24" height="24" /> : null}
      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className={[icon ? styles.hasIcon : '', chat ? styles.chat : ''].join(
            ' '
          )}
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={[icon ? styles.hasIcon : '', chat ? styles.chat : ''].join(
            ' '
          )}
        />
      )}
    </div>
  </div>
);

export default FormGroup;
