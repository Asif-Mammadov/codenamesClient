import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';

const Room = ({ translate, gameStarted, socket, player, players }) => {
  const router = useRouter();

  useEffect(() => {
    // if (!player || !players) {
    //   console.log('test');
    //   router.push('/game');
    // }
  }, [player, players]);

  const onLangChange = (lang) => {
    // Send game language to server
    socket.emit('sendLang', lang.icon); // icon = az, fr, ar, en
  };

  const onStartGame = () => {
    gameStarted();
    // Notify server that game starts
    socket.emit('startGame');
  };

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
            joinAsOps={() => socket.emit('joinedRedOps', player)}
            joinAsSpy={() => socket.emit('joinedRedSpy', player)}
          />
        </section>

        <section className={styles.content}>
          <h1>{translate('welcome_room')}</h1>
          <p>{translate('choose_team')}</p>

          <div className={styles.gameLang}>
            <h6>{translate('game_lang')}</h6>
            <Dropdown items={LANGS} light onChange={onLangChange} />
          </div>

          <Button shadow clicked={onStartGame}>
            {translate('start_game')}
          </Button>
        </section>

        <section className={styles.cardWrapper}>
          <TeamCard
            translate={translate}
            operatives={players.blueOps}
            spymaster={players.blueSpy}
            joinAsOps={() => socket.emit('joinedBlueOps', player)}
            joinAsSpy={() => socket.emit('joinedBlueSpy', player)}
            myUsername={player ? player.username : null}
          />
        </section>
      </div>
      {/* For mobile */}
      <section className={[styles.content, styles.mobile].join(' ')}>
        <div className={styles.gameLang}>
          <h6>{translate('game_lang')}</h6>
          <Dropdown items={LANGS} light upward onChange={onLangChange} />
        </div>

        <Button shadow clicked={onStartGame}>
          {translate('start_game')}
        </Button>
      </section>
    </div>
  ) : null;
};

export default Room;
