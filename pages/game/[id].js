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
  // Store game state
  const [game, setGame] = useState({
    blueFirst: false,
    board: [],
    labels: [],
    enterClue: false,
    clues: []
  });

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
          console.log(socket.id);
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
        }
      });

      // Get player info and update player
      socket.on('updateRole', (playerInfo) => {
        // Save in localstorage
        window.localStorage.setItem('player', JSON.stringify(playerInfo));
        setPlayer(playerInfo);
        console.log(playerInfo);
      });

      // Get all players info
      socket.on('updatePlayers', (playersInfo) => {
        // Save in localstorage
        window.localStorage.setItem('players', JSON.stringify(playersInfo));
        setPlayers(playersInfo);
      });

      // Check if blue starts the game
      socket.on('gameStarted', (blueStarts) => {
        setIsGameStarted(true);
        setGame((prevState) => {
          return { ...prevState, blueFirst: blueStarts };
        });
      });

      // If not player's turn
      socket.on('notYourTurn', (team, isSpymaster) => {
        if (player.team === team && player.isSpymaster === isSpymaster) {
          console.log('not your turn');
          updatePlayer((prevState) => {
            return { ...prevState, yourTurn: false };
          });
        }
      });

      // Get labels for spymaster
      socket.on('getLabels', (id, labels) => {
        if ((socket.id = id)) {
          setGame((prevState) => {
            return { ...prevState, labels };
          });
        }
      });

      // Get board for operatives
      socket.on('getBoard', (board) => {
        setGame((prevState) => {
          return { ...prevState, board };
        });
      });

      // Start enter clue mode
      socket.on('enterClue', (id) => {
        if (socket.id === id) {
          console.log('enter clue');
          setGame((prevState) => {
            return { ...prevState, enterClue: true };
          });
        }
      });

      // Get clues
      socket.on('getClues', (clues) => {
        console.log(clues);
        setGame((prevState) => {
          return { ...prevState, clues };
        });
      });

      // Blue spy turn
      socket.on('turnBlueSpy', (id) => {
        console.log('is Blue spy: ', socket.id === id);
        if (socket.id === id) {
          console.log('blue spy turn');
          setGame((prevState) => {
            return { ...prevState, yourTurn: true };
          });
        }
      });

      // Red spy turn
      socket.on('turnRedSpy', (id) => {
        if (socket.id === id) {
          console.log('socket id', socket.id);
          console.log('socket id from server', id);
          setGame((prevState) => {
            return { ...prevState, yourTurn: true };
          });
        }
      });

      // On choose card
      socket.on('chooseCard', (team, isSpymaster) => {
        if (player.team === team && !isSpymaster) {
          console.log('choose a card');
          updatePlayer((prevState) => {
            return { ...prevState, yourTurn: true };
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
    setPlayer: setPlayer
  };

  return (
    <GameLayout translate={t} onLeaveRoom={handleLeaveRoom}>
      {isGameStarted ? (
        <Playboard key={players} game={game} {...gameConfig} />
      ) : (
        <Room
          key={players}
          gameStarted={() => setIsGameStarted(true)}
          setPlayers={setPlayers}
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
