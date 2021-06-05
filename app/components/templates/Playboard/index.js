import React, { useEffect, useState } from 'react';
import Button from '../../elements/Button';
import TeamCard from '../../elements/TeamCard';
import Gamelog from '../../elements/Gamelog';
import styles from './Playboard.module.scss';
import Chat from '../../elements/Chat';
import GameArea from '../../elements/GameArea';
import ClueForm from '../../elements/ClueForm';

const Playboard = ({
  translate,
  socket,
  player,
  updatePlayer,
  players,
  updatePlayers
}) => {
  // Store game state
  const [game, setGame] = useState({
    blueFirst: false,
    board: [],
    labels: [],
    enterClue: false,
    clues: []
  });

  useEffect(() => {
    if (socket) {
      // Check if blue starts the game
      socket.on('gameStarted', (blueStarts) => {
        console.log(blueStarts);
        setGame({ ...game, blueFirst: blueStarts });
      });

      // Get player info and update player
      socket.on('updateRole', (playerInfo) => updatePlayer(playerInfo));

      // Get all players info
      socket.on('updatePlayers', (playersInfo) => updatePlayers(playersInfo));

      // If not player's turn
      socket.on('notYourTurn', (team, isSpymaster) => {
        if (player.team === team && player.isSpymaster === isSpymaster) {
          updatePlayer({ ...player, yourTurn: false });
        }
      });

      // Get labels for spymaster
      socket.on('getLabels', (socketID, labels) => {
        console.log(labels);
        if (socketID == socket.id) {
          setGame({ ...game, labels: labels });
        }
      });

      // Get board for operatives
      socket.on('getBoard', (boardValues) => {
        console.log(boardValues);
        setGame({ ...game, board: boardValues });
      });

      // Start enter clue mode
      socket.on('enterClue', (socketID) => {
        if (socketID === socket.id) {
          setGame({ ...game, enterClue: true });
        }
      });

      // Get clues
      socket.on('getClues', (clues) => {
        setGame({ ...game, clues });
      });

      // Blue spy turn
      socket.on('turnBlueSpy', (socketID) => {
        if (socket.id === socketID) {
          updatePlayer({ ...player, yourTurn: true });
        }
      });

      // Red spy turn
      socket.on('turnRedSpy', (socketID) => {
        if (socket.id === socketID) {
          updatePlayer({ ...player, yourTurn: true });
        }
      });

      // On choose card
      socket.on('chooseCard', (team, isSpymaster) => {
        if (player.team === team && player.isSpymaster === isSpymaster) {
          updatePlayer({ ...player, yourTurn: true });
        }
      });

      console.log(game);
    }
  }, [socket]);

  // Select a card
  const onCardSelected = (id) => {
    if (player.yourTurn && !player.isSpymaster) {
      socket.emit('cardChosen', id);
    }
  };

  // End turn
  const onEndTurn = () => {
    if (player.yourTurn && !player.isSpymaster) {
      updatePlayer({ ...player, yourTurn: false });
      socket.emit('endTurn');
    }
  };

  // Enter clue
  const onClueEntered = (clue, count) => {
    socket.emit('clueEntered', clue, count, player.name);
    updatePlayer({ ...player, yourTurn: false });
  };

  return (
    <div className={styles.boardContainer}>
      {/* Game section */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <TeamCard
            translate={translate}
            startFirst={!game.blueFirst}
            operatives={players ? players.redOps : []}
            spymaster={players ? players.redSpy : []}
            gameMode
            isRed
          />
        </section>

        <GameArea
          spymaster={player.isSpymaster}
          board={game.board}
          labels={game.labels}
          selectCard={onCardSelected}
        />

        <section className={styles.sectionWrapper}>
          <TeamCard
            translate={translate}
            startFirst={game.blueFirst}
            operatives={players ? players.blueOps : []}
            spymaster={players ? players.blueSpy : []}
            gameMode
          />
        </section>
      </div>

      {/* Game area for mobile */}
      <GameArea
        isMobile
        spymaster={player.isSpymaster}
        board={game.board}
        labels={game.labels}
        selectCard={onCardSelected}
      />

      {/* Clue form for mobile */}
      {game.enterClue ? (
        <ClueForm translate={translate} enterClue={onClueEntered} isMobile />
      ) : (
        <div className={[styles.endTurnWrapper, styles.mobile].join(' ')}>
          <Button clicked={onEndTurn} style={{ margin: '20 auto' }}>
            End Turn
          </Button>
        </div>
      )}

      {/* Log, chat, clue sections */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <Gamelog translate={translate} clues={game.clues} />
        </section>

        {game.enterClue ? (
          <ClueForm translate={translate} enterClue={onClueEntered} />
        ) : (
          <div className={styles.endTurnWrapper}>
            <Button clicked={onEndTurn} style={{ margin: '0 auto' }}>
              End Turn
            </Button>
          </div>
        )}

        <section className={styles.sectionWrapper}>
          <Chat translate={translate} />
        </section>
      </div>
    </div>
  );
};

export default Playboard;
