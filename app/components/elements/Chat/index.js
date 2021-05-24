import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import styles from './Chat.module.scss';

const Chat = () => {
  const [chatBox, setChatBox] = useState({
    value: '',
    valid: false
  });

  const chat = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat
    chat.current.scrollTop = chat.current.scrollHeight;
  }, []);

  // Handle chatbox value change
  const onValueChanged = (e) =>
    setChatBox({ value: e.target.value, valid: e.target.value.trim() !== '' });

  const submitHandler = (e) => {
    e.preventDefault();

    if (chatBox.value.trim() !== '') {
      console.log(chatBox.value);
    }
  };

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
      <form onSubmit={submitHandler}>
        <FormGroup
          name="chatBox"
          type="textarea"
          placeholder="Type something..."
          value={chatBox.value}
          changed={onValueChanged}
          isChat
        />

        <div className={styles.btnWrapper}>
          <Button icon="send" extraSmall disabled={!chatBox.valid}></Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
