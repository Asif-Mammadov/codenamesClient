import React from 'react';
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
  game
}) => {
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
            myUsername={player.name}
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
            myUsername={player.name}
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
