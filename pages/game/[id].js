import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GameLayout from '../../app/components/layouts/GameLayout';
import Playboard from '../../app/components/templates/Playboard';
import Room from '../../app/components/templates/Room';
import { useSocket } from '../../app/contexts/SocketProvider';

const RoomPage = () => {
  const { t } = useTranslation();
  const [isGameStarted, setIsGameStarted] = useState(false);

  // LocalStorage hooks (created in 'create or join room' page)
  const [player, setPlayer] = useState();
  const [players, setPlayers] = useState();

  const router = useRouter();

  // Get socket connection
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const roomId = router.query.id;
      
      socket.on('connect', () => {
        if (socket.id) {
          // Check player
          socket.emit('checkUser', roomId, socket.id);
        }
      });
      

      // Redirect if not authenticated
      socket.on('unauth', () => router.push('/game'));

      // Get player and players info from localstorage
      setPlayer(JSON.parse(window.localStorage.getItem('player')));
      setPlayers(JSON.parse(window.localStorage.getItem('players')));

      // Send room to the server to check if it's valid
      socket.emit('checkRoom', roomId);

      // Get result
      socket.on('roomChecked', (isValid) => {
        // If not valid, navigate to game page
        if (!isValid) {
          router.push('/game');
        } else {
          // Get player info and update player
          socket.on('updateRole', (playerInfo) => {
            // Save in localstorage
            window.localStorage.setItem('player', JSON.stringify(playerInfo));
            setPlayer(playerInfo);
          });

          // Get all players info
          socket.on('updatePlayers', (playersInfo) => {
            // Save in localstorage
            window.localStorage.setItem('players', JSON.stringify(playersInfo));
            setPlayers(playersInfo);
          });
        }
      });
    }
  }, [socket]);

  // Handle leave room
  const handleLeaveRoom = () => {
    socket.emit('exitRoom');
    // Go back to game page
    router.push('/game');
  };

  // Common config for game pages
  const gameConfig = {
    translate: t,
    socket: socket,
    player: player,
    players: players,
    setPlayer: setPlayer,
    setPlayers: setPlayers
  };

  return (
    <GameLayout translate={t} onLeaveRoom={handleLeaveRoom}>
      {isGameStarted ? (
        <Playboard key={players} {...gameConfig} />
      ) : (
        <Room
          key={players}
          gameStarted={() => setIsGameStarted(true)}
          {...gameConfig}
        />
      )}
    </GameLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default RoomPage;
