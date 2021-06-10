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

  const [player, setPlayer] = useState();
  const [players, setPlayers] = useState();
  // Store game state
  const [game, setGame] = useState({
    blueFirst: false,
    board: [],
    labels: [],
    enterClue: false,
    yourTurn: false,
    clues: [],
    redScore: 0,
    blueScore: 0,
    globalChat: [],
    teamChat: [],
  });

  const router = useRouter();

  // Get socket connection
  const socket = useSocket();

  useEffect(() => {
    console.log('PLAYER', player);
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

      // Get player and players info from storage
      setPlayer(JSON.parse(window.sessionStorage.getItem('player')));
      setPlayers(JSON.parse(window.sessionStorage.getItem('players')));

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
        // Save in storage
        window.sessionStorage.setItem('player', JSON.stringify(playerInfo));
        setPlayer(playerInfo);
      });

      // Get all players info
      socket.on('updatePlayers', (playersInfo) => {
        // Save in storage
        window.sessionStorage.setItem('players', JSON.stringify(playersInfo));
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
        const player = JSON.parse(window.sessionStorage.getItem('player'));
        console.log('not your turn');
        if (player.team === team && player.isSpymaster === isSpymaster) {
          console.log('not your turn passed if');
          setGame((prevState) => {
            return { ...prevState, yourTurn: false };
          });
        }
      });

      // Get labels for spymaster
      socket.on('getLabels', (id, labels) => {
        console.log(labels);
        if (socket.id === id) {
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

      // Get game score
      socket.on('getScore', (blue, red) => {
        setGame((prevState) => {
          return { ...prevState, blueScore: blue, redScore: red };
        });
      });

      // Blue spy turn
      socket.on('turnBlueSpy', (id) => {
        console.log('blue socket id', socket.id);
        console.log('blue socket id from server', id);
        if (socket.id === id) {
          console.log('blue spy turn');
          setGame((prevState) => {
            return { ...prevState, yourTurn: true };
          });
        }
      });

      // Red spy turn
      socket.on('turnRedSpy', (id) => {
        console.log('red socket id', socket.id);
        console.log('red socket id from server', id);
        if (socket.id === id) {
          setGame((prevState) => {
            return { ...prevState, yourTurn: true };
          });
        }
      });

      // On choose card
      socket.on('chooseCard', (team, isSpymaster) => {
        const player = JSON.parse(window.sessionStorage.getItem('player'));
        console.log('test');
        if (player.team === team && !isSpymaster) {
          console.log('choose a card');
          setGame((prevState) => {
            return { ...prevState, yourTurn: true };
          });
        }
      });

      // Get global chat messages
      socket.on('getGlobalMessages', (messages) => {
        setGame((prevState) => {
          return { ...prevState, globalChat: messages };
        });
      });

      // Get team messages
      socket.on('getTeamMessages', (messages, team) => {
        const player = JSON.parse(window.sessionStorage.getItem('player'));
        setGame((prevState) => {
          if (player.team === team) {
            return { ...prevState, teamChat: messages };
          }
        });
      });

      // Handle game over
      socket.on('gameEnded', () => setIsGameStarted(false));
    }
  }, [socket]);

  // Handle game start
  const onStartGame = () => {
    // Don't start if teams are not full
    if (
      !players.redSpy ||
      !players.blueSpy ||
      players.redOps.length === 0 ||
      players.blueOps.length === 0
    ) {
      return;
    }

    setIsGameStarted(true);
    // Notify server that game starts
    socket.emit('startGame');
  };

  // Handle player join
  const join = (type) => socket.emit(`joined${type}`, player);

  // Handle lang change
  const onLangChange = (lang) => {
    // Send game language to server
    socket.emit('sendLang', lang.icon); // icon = az, fr, ar, en
  };

  // Handle leave room
  const handleLeaveRoom = () => {
    socket.emit('exitRoom');
    // Go back to game page
    router.push('/game');
  };

  // Select a card
  const onCardSelected = (id) => {
    if (game.yourTurn && !player.isSpymaster) {
      socket.emit('cardChosen', id);
    }
  };

  // End turn
  const onEndTurn = () => {
    if (game.yourTurn && !player.isSpymaster) {
      socket.emit('endTurn');
      setGame((prevState) => {
        return { ...prevState, yourTurn: false };
      });
    }
  };

  // Enter clue
  const onClueEntered = (clue) => {
    socket.emit('clueEntered', clue.word, clue.count, player.name);
    console.log(clue.word, clue.count, player.name);
    setGame((prevState) => {
      return { ...prevState, enterClue: false };
    });
  };

  // Send global message
  const globalMessageSent = (message) =>
    socket.emit('sendGlobalMessage', message);

  // Send team message
  const teamMessageSent = (message) =>
    socket.emit('sendTeamMessage', message, player.team);

  // Common config for game pages
  const gameConfig = {
    translate: t,
    player: player,
    players: players
  };

  return (
    <GameLayout translate={t} onLeaveRoom={handleLeaveRoom}>
      {isGameStarted ? (
        <Playboard
          {...gameConfig}
          game={game}
          selectCard={onCardSelected}
          endTurn={onEndTurn}
          enterClue={onClueEntered}
          sendGlobalMessage={globalMessageSent}
          sendTeamMessage={teamMessageSent}
        />
      ) : (
        <Room
          {...gameConfig}
          startGame={onStartGame}
          changeLang={onLangChange}
          joinAs={join}
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
