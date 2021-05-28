import React from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';

const Room = ({ translate, gameStarted }) => {
  return (
    <div className={styles.roomContainer}>
      {/* For mobile */}
      <section className={[styles.content, styles.mobile].join(' ')}>
        <h1>{translate('welcome_room')}</h1>
        <p>{translate('choose_team')}</p>
      </section>

      <div className={styles.roomBody}>
        <section className={styles.cardWrapper}>
          <TeamCard translate={translate} isRed />
        </section>

        <section className={styles.content}>
          <h1>{translate('welcome_room')}</h1>
          <p>{translate('choose_team')}</p>

          <div className={styles.gameLang}>
            <h6>{translate('game_lang')}</h6>
            <Dropdown items={LANGS} light />
          </div>

          <Button shadow clicked={gameStarted}>
            {translate('start_game')}
          </Button>
        </section>

        <section className={styles.cardWrapper}>
          <TeamCard translate={translate} />
        </section>
      </div>

      {/* For mobile */}
      <section className={[styles.content, styles.mobile].join(' ')}>
        <div className={styles.gameLang}>
          <h6>{translate('game_lang')}</h6>
          <Dropdown items={LANGS} light upward />
        </div>

        <Button shadow>{translate('start_game')}</Button>
      </section>
    </div>
  );
};

export default Room;
