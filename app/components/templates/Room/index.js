import React, { useContext, useEffect, useState } from 'react';
import { LANGS } from '../../../data/main';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import TeamCard from '../../elements/TeamCard';
import styles from './Room.module.scss';
import { useRouter } from 'next/router';
import { SocketContext } from '../../../socket';

const Room = ({
  translate,
  gameStarted,
  player,
  updatePlayer,
  players,
  updatePlayers
}) => {
  const router = useRouter();

  // Get socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Send room to the server to check if it's valid
    socket.emit('checkRoom', router.query.id);
    // Get result
    socket.on('roomChecked', (isValid) => {
      // If not valid, navigate to game page
      if (!isValid) {
        router.push(['/game']);
      }
    });

    // Get player info and update player
    socket.on('updateRole', (playerInfo) => updatePlayer(playerInfo));

    // Get all players info
    socket.on('updatePlayers', (players) => updatePlayers(players));
  }, [socket]);

  const onLangChange = (lang) => {
    // Send game language to server
    socket.emit('sendLang', lang.name); // name = Azerbaijani, French...
  };

  const onStartGame = () => {
    // Notify server that game starts
    socket.emit('startGame');
  };

  return players ? (
    <div className={styles.roomContainer}>
      For mobile
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

          <Button shadow clicked={gameStarted} clicked={onStartGame}>
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
