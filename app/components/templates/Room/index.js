import React from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';

const Room = () => {
  return (
    <div className={styles.roomContainer}>
      <section className={[styles.content, styles.mobile].join(' ')}>
        <h1>
          WELCOME TO THE <span>ROOM!</span>
        </h1>
        <p>Please choose your team and role.</p>
      </section>

      <div className={styles.roomBody}>
        <section className={styles.cardWrapper}>
          <TeamCard isRed />
        </section>

        <section className={styles.content}>
          <h1>
            WELCOME TO THE <span>ROOM!</span>
          </h1>
          <p>Please choose your team and role.</p>

          <div className={styles.gameLang}>
            <h6>Game language</h6>
            <Dropdown items={LANGS} light />
          </div>

          <Button shadow>Start Game</Button>
        </section>

        <section className={styles.cardWrapper}>
          <TeamCard />
        </section>
      </div>

      <section className={[styles.content, styles.mobile].join(' ')}>
        <div className={styles.gameLang}>
          <h6>Game language</h6>
          <Dropdown items={LANGS} light upward />
        </div>

        <Button shadow>Start Game</Button>
      </section>
    </div>
  );
};

export default Room;
