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
  player,
  players,
  selectCard,
  enterClue,
  endTurn,
  sendGlobalMessage,
  sendTeamMessage,
  game
}) => {
  console.log(player);
  console.log(game);

  return (
    <div className={styles.boardContainer}>
      {/* Game section */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <TeamCard
            translate={translate}
            operatives={players ? players.redOps : []}
            spymaster={players ? players.redSpy : []}
            myUsername={player.name}
            score={game.redScore}
            gameMode
            isRed
          />
        </section>

        <GameArea
          spymaster={player.isSpymaster}
          board={game.board}
          labels={game.labels}
          selectCard={selectCard}
        />

        <section className={styles.sectionWrapper}>
          <TeamCard
            translate={translate}
            operatives={players ? players.blueOps : []}
            spymaster={players ? players.blueSpy : []}
            myUsername={player.name}
            score={game.blueScore}
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
        selectCard={selectCard}
      />

      {/* Clue form for mobile */}
      {game.enterClue ? (
        <ClueForm translate={translate} enterClue={enterClue} isMobile />
      ) : null}

      {game.yourTurn && !player.isSpymaster ? (
        <div className={[styles.endTurnWrapper, styles.mobile].join(' ')}>
          <Button clicked={endTurn} style={{ margin: '20 auto' }}>
            End Turn
          </Button>
        </div>
      ) : null}

      {/* Log, chat, clue sections */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <Gamelog translate={translate} clues={game.clues} />
        </section>

        {game.enterClue ? (
          <ClueForm translate={translate} enterClue={enterClue} />
        ) : null}

        {game.yourTurn && !player.isSpymaster ? (
          <div className={styles.endTurnWrapper}>
            <Button clicked={endTurn} style={{ margin: '0 auto' }}>
              End Turn
            </Button>
          </div>
        ) : null}

        <section className={styles.sectionWrapper}>
          <Chat
            translate={translate}
            globalMessages={game.globalChat}
            teamMessages={game.teamChat}
            onSendGlobal={sendGlobalMessage}
            onSendTeam={sendTeamMessage}
            myUsername={player.name}
          />
        </section>
      </div>
    </div>
  );
};

export default Playboard;
