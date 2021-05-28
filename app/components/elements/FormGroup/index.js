import React from 'react';
import Icon from '../Icon';
import styles from './FormGroup.module.scss';

const FormGroup = ({
  label,
  name,
  type,
  value,
  placeholder,
  changed,
  error,
  icon,
  isChat,
  translate,
  style
}) => {
  const defaults = {
    id: name,
    placeholder,
    value,
    className: [
      error ? styles.invalid : '',
      icon ? styles.hasIcon : '',
      isChat ? styles.chat : ''
    ].join(' '),
    onChange: changed
  };

  return (
    <div className={styles.formGroup} style={{ ...style }}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <div className={styles.inputWrapper}>
        {icon ? <Icon name={icon} width="24" height="24" /> : null}
        {type === 'textarea' ? (
          <textarea {...defaults}></textarea>
        ) : (
          <input type={type} {...defaults} />
        )}
      </div>
      {error ? (
        <small>
          <Icon name="alert" style={{ marginRight: 8 }} />
          <span>{translate(error)}</span>
        </small>
      ) : null}
    </div>
  );
};

export default FormGroup;
