import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../elements/Button';
import styles from './GameLayout.module.scss';
import Message from '../../elements/Message';

const GameLayout = ({ children, translate, onLeaveRoom }) => {
  const [isScrollOn, setIsScrollOn] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      // Set scroll on as soon as scroll starts
      setIsScrollOn(window.scrollY > 50)
    );
  });

  // Handle share room button
  const onShareRoom = () => {
    // Create an input element
    const textInput = document.createElement('input');
    // Give url as value
    textInput.value = window.location.href;
    document.body.appendChild(textInput);
    textInput.select();
    // Copy to clipboard
    document.execCommand('copy');
    // Remove the element`
    textInput.remove();

    setIsCopied(true);

    // Remove message after some time
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <header
        className={[
          styles.gameHeader,
          isScrollOn ? styles.darkScrollOn : ''
        ].join(' ')}
      >
        <Link href="/">
          <a>
            <img className={styles.logo} src="/logo-light.svg" />
          </a>
        </Link>

        <div className={styles.buttons}>
          <Button
            icon="share"
            type="room"
            shadow
            small
            style={{ marginRight: 16 }}
            clicked={onShareRoom}
          >
            <span className={styles.btnText}>{translate('share_room')}</span>
          </Button>

          <Button
            icon="out"
            type="room-white"
            shadow
            small
            clicked={onLeaveRoom}
          >
            <span className={styles.btnText}>{translate('leave_room')}</span>
          </Button>
        </div>
      </header>

      <main className={styles.game}>
        <Message show={isCopied} msg={translate('room_copied')} />

        <div className={styles.gameBg}></div>
        <section className={styles.gameContent}>{children}</section>
      </main>
    </>
  );
};

export default GameLayout;
