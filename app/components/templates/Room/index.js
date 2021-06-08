import React from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';

const Room = ({
  translate,
  startGame,
  changeLang,
  player,
  players,
  joinAs
}) => {
  return player && players ? (
    <div className={styles.roomContainer}>
      {/* For mobile */}
      <section className={[styles.content, styles.mobile].join(' ')}>
        <h1>{translate('welcome_room')}</h1>
        <p>{translate('choose_team')}</p>
      </section>

      <div className={styles.roomBody}>
        <section className={styles.cardWrapper}>
          <TeamCard
            translate={translate}
            isRed
            operatives={players.redOps}
            spymaster={players.redSpy}
            joinAsOps={() => joinAs('RedOps')}
            joinAsSpy={() => joinAs('RedSpy')}
            myUsername={player.name}
          />
        </section>

        <section className={styles.content}>
          <h1>{translate('welcome_room')}</h1>
          <p>{translate('choose_team')}</p>

          {player.isHost ? (
            <div className={styles.gameLang}>
              <h6>{translate('game_lang')}</h6>
              <Dropdown items={LANGS} light onChange={changeLang} />
            </div>
          ) : null}

          {player.isHost ? (
            <Button shadow clicked={startGame}>
              {translate('start_game')}
            </Button>
          ) : null}
        </section>

        <section className={styles.cardWrapper}>
          <TeamCard
            translate={translate}
            operatives={players.blueOps}
            spymaster={players.blueSpy}
            joinAsOps={() => joinAs('BlueOps')}
            joinAsSpy={() => joinAs('BlueSpy')}
            myUsername={player.name}
          />
        </section>
      </div>

      {/* For mobile */}
      <section className={[styles.content, styles.mobile].join(' ')}>
        {player.isHost ? (
          <div className={styles.gameLang}>
            <h6>{translate('game_lang')}</h6>
            <Dropdown items={LANGS} light upward onChange={changeLang} />
          </div>
        ) : null}

        {player.isHost ? (
          <Button shadow clicked={startGame}>
            {translate('start_game')}
          </Button>
        ) : null}
      </section>
    </div>
  ) : null;
};

export default Room;
