import React, { useEffect, useRef } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import styles from './Chat.module.scss';

const Chat = () => {
  const chat = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat
    chat.current.scrollTop = chat.current.scrollHeight;
  }, []);

  return (
    <div className={styles.chat} ref={chat}>
      <div className={styles.boxHeader}>
        <h3>Global</h3>
        <Button extraSmall>Switch</Button>
      </div>

      <div className={styles.boxContent}>
        {Array.from({ length: 5 }).map((item) => (
          <div key={item} className={[styles.message].join(' ')}>
            <div>
              <img src="/img/avatar.png" />
              <span>Eyvaz</span>
            </div>
            <p>Hello world</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form>
        <FormGroup
          name="chat-input"
          type="textarea"
          placeholder="Type something..."
          chat
        />

        <div className={styles.btnWrapper}>
          <Button icon="send" extraSmall></Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
