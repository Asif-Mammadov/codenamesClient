import React from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import GameCard from '../../elements/GameCard';
import TeamCard from '../../elements/TeamCard';
import Gamelog from '../../elements/Gamelog';
import styles from './Playboard.module.scss';
import Chat from '../../elements/Chat';

const ClueForm = ({ isMobile }) => {
  return (
    <form
      className={[styles.clueForm, isMobile ? styles.mobile : ''].join(' ')}
      onSubmit={submitHandler}
    >
      <div>
        <FormGroup
          name="clue"
          type="text"
          placeholder="Your clue"
          style={{ width: '100%', marginRight: 8 }}
        />
        <FormGroup name="count" type="number" placeholder="0" />
      </div>

      <Button shadow small style={{ marginTop: 8, width: '100%' }}>
        Give clue
      </Button>
    </form>
  );
};

const GameArea = ({ isMobile }) => (
  <div className={[styles.gameArea, isMobile ? styles.mobile : ''].join(' ')}>
    {Array.from({ length: 25 }).map((item) => (
      <div key={item} className={styles.gameCard}>
        <GameCard />
      </div>
    ))}
  </div>
);

const Playboard = () => {
  return (
    <div className={styles.boardContainer}>
      {/* Game section */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <TeamCard isRed gameMode />
        </section>

        <GameArea />

        <section className={styles.sectionWrapper}>
          <TeamCard gameMode />
        </section>
      </div>

      {/* Game area for mobile */}
      <GameArea isMobile />

      {/* Clue form for mobile */}
      <ClueForm isMobile />

      {/* Log, chat, clue sections */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <Gamelog />
        </section>

        <ClueForm />

        <section className={styles.sectionWrapper}>
          <Chat />
        </section>
      </div>
    </div>
  );
};

export default Playboard;
