import React from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import GameCard from '../../elements/GameCard';
import TeamCard from '../../elements/TeamCard';
import Gamelog from '../../elements/Gamelog';
import styles from './Playboard.module.scss';
import Chat from '../../elements/Chat';

const Playboard = () => {
  return (
    <div className={styles.boardContainer}>
      {/* Game section */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <TeamCard isRed gameMode />
        </section>

        <section className={styles.gameArea}>
          {Array.from({ length: 25 }).map((item) => (
            <div key={item} className={styles.gameCard}>
              <GameCard />
            </div>
          ))}
        </section>

        <section className={styles.sectionWrapper}>
          <TeamCard gameMode />
        </section>
      </div>

      {/* Game area for mobile */}
      <div className={[styles.gameArea, styles.mobile].join(' ')}>
        {Array.from({ length: 25 }).map((item) => (
          <div key={item} className={styles.gameCard}>
            <GameCard />
          </div>
        ))}
      </div>

      {/* Clue form for mobile */}
      <form className={[styles.clueForm, styles.mobile].join(' ')}>
        <div>
          <FormGroup
            name="clue"
            type="text"
            placeholder="Your clue"
            style={{ marginRight: 8 }}
          />
          <FormGroup name="count" type="number" placeholder="0" />
        </div>
        <Button shadow small style={{ marginTop: 8, width: '100%' }}>
          Give clue
        </Button>
      </form>

      {/* Log, chat, clue sections */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <Gamelog />
        </section>

        <form className={styles.clueForm}>
          <div>
            <FormGroup
              name="clue"
              type="text"
              placeholder="Your clue"
              style={{ marginRight: 8 }}
            />
            <FormGroup name="count" type="number" placeholder="0" />
          </div>
          <Button shadow small style={{ marginTop: 8, width: '100%' }}>
            Give clue
          </Button>
        </form>

        <section className={styles.sectionWrapper}>
          <Chat />
        </section>
      </div>
    </div>
  );
};

export default Playboard;
