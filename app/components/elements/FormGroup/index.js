import React from 'react';
import Icon from '../Icon';
import styles from './FormGroup.module.scss';

const FormGroup = ({ label, name, type, placeholder, icon, style }) => (
  <div className={styles.formGroup} style={{ ...style }}>
    {label ? <label htmlFor={name}>{label}</label> : null}

    <div className={styles.inputWrapper}>
      {icon ? <Icon name={icon} width="24" height="24" /> : null}
      <input id={name} type={type} placeholder={placeholder} />
    </div>
  </div>
);

export default FormGroup;
