import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import styles from './Chat.module.scss';

const Chat = ({
  translate,
  globalMessages,
  teamMessages,
  onSendGlobal,
  onSendTeam,
  myUsername
}) => {
  const [chatBox, setChatBox] = useState({
    value: '',
    valid: false
  });
  const [isGlobal, setIsGlobal] = useState(true);

  const chat = useRef(null);

  console.log(globalMessages);
  console.log(teamMessages);

  useEffect(
    () =>
      // Scroll to the bottom of the chat
      (chat.current.scrollTop = chat.current.scrollHeight),
    []
  );

  // Handle chatbox value change
  const onValueChanged = (e) =>
    setChatBox({ value: e.target.value, valid: e.target.value.trim() !== '' });

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    if (chatBox.value.trim() !== '') {
      const message = { name: myUsername, content: chatBox.value };

      isGlobal ? onSendGlobal(message) : onSendTeam(message);

      // Clear input
      setChatBox({ value: '', valid: false });
    }
  };

  return (
    <div className={styles.chat} ref={chat}>
      <div className={styles.boxHeader}>
        <h3>{translate(isGlobal ? 'global' : 'team')}</h3>
        <Button extraSmall clicked={() => setIsGlobal((prev) => !prev)}>
          {translate('switch')}
        </Button>
      </div>

      <div className={styles.boxContent}>
        {(isGlobal ? globalMessages : teamMessages).map((item) => (
          <div
            key={item.content}
            className={[
              styles.message,
              myUsername === item.name ? styles.me : ''
            ].join(' ')}
          >
            <div>
              <img src="/img/avatar.png" />
              <span>{item.name}</span>
            </div>
            <p>{item.content}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={submitHandler}>
        <FormGroup
          name="chatBox"
          type="textarea"
          placeholder={translate('type_smth')}
          value={chatBox.value}
          changed={onValueChanged}
          isChat
        />

        <div className={styles.btnWrapper}>
          <Button icon="send" extraSmall disabled={!chatBox.valid} />
        </div>
      </form>
    </div>
  );
};

export default Chat;
