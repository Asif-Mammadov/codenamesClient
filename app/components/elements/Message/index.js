import React from 'react';
import Icon from '../Icon';
import styles from './Message.module.scss';

const Message = ({ msg, show }) => (
  <div className={[styles.message, show ? styles.show : ''].join(' ')}>
    <Icon name="tick" style={{ marginRight: 8 }} />
    <span>{msg}</span>
  </div>
);

export default Message;
