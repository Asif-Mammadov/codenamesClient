import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../elements/Button';
import styles from './GameLayout.module.scss';

const GameLayout = (props) => {
  const [isScrollOn, setIsScrollOn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      // Set scroll on as soon as scroll starts
      setIsScrollOn(window.scrollY > 50)
    );
  });

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
          >
            <span className={styles.btnText}>Share Room</span>
          </Button>

          <Link href="/game">
            <a>
              <Button icon="out" type="room-white" shadow small>
                <span className={styles.btnText}>Leave Room</span>
              </Button>
            </a>
          </Link>
        </div>
      </header>

      <main>
        <div className={styles.gameBg}></div>
        <section className={styles.gameContent}>{props.children}</section>
      </main>
    </>
  );
};

export default GameLayout;
