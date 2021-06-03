import React, { useEffect, useState } from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';
import { useRouter } from 'next/router';

const Room = ({ translate, gameStarted, socket }) => {
  // Game info
  const [player, setPlayer] = useState();
  const [players, setPlayers] = useState();
  const router = useRouter();

  useEffect(() => {
    if (socket) {
      // Send room to the server to check if it's valid
      socket.emit('checkRoom', router.query.id);
      // Get result
      socket.on('roomChecked', (isValid) => {
        // If not valid, navigate to game page
        if (!isValid) {
          router.push('/game');
        }
      });

      // Get player info and update player
      socket.on('updateRole', (playerInfo) => {
        console.log(playerInfo);
        // setPlayer(playerInfo);
        setPlayer('test');
      });

      // Get all players info
      socket.on('updatePlayers', (playersInfo) => {
        console.log(playersInfo);
        setPlayers(playersInfo);
      });
    }
  });

  const onLangChange = (lang) => {
    // Send game language to server
    socket.emit('sendLang', lang.icon); // icon = az, fr, ar, en
  };

  const onStartGame = () => {
    // Notify server that game starts
    socket.emit('startGame');
    gameStarted();
  };

  const onJoin = () => console.log(player);

  return (
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
            operatives={players ? players.redOps : []}
            spymasters={players ? players.redSpy : []}
            joinAsOps={onJoin}
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
            operatives={players ? players.blueOps : []}
            spymasters={players ? players.blueSpy : []}
            joinAsOps={() => socket.emit('joinedBlueOps', player)}
            joinAsSpy={() => socket.emit('joinedBlueSpy', player)}
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
  );
};

export default Room;
