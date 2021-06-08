import React from 'react';
import Icon from '../Icon';
import styles from './FormError.module.scss';

const FormError = ({ error }) => (
  <div className={[styles.formError, error ? styles.show : ''].join(' ')}>
    <Icon name="cross" style={{ marginRight: 8 }} />
    <span>{error}</span>
  </div>
);

export default FormError;
