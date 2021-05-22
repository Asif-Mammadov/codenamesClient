import React from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import GameCard from '../../elements/GameCard';
import TeamCard from '../../elements/TeamCard';
import styles from './Playboard.module.scss';

const Playboard = () => {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardRow}>
        <section className={styles.cardWrapper}>
          <TeamCard isRed gameMode />
        </section>

        <section className={styles.gameArea}>
          {Array.from({ length: 25 }).map((item) => (
            <div key={item} className={styles.gameCard}>
              <GameCard />
            </div>
          ))}
        </section>

        <section className={styles.cardWrapper}>
          <TeamCard gameMode />
        </section>
      </div>

      <section className={[styles.gameArea, styles.mobile].join(' ')}>
        {Array.from({ length: 25 }).map((item) => (
          <div key={item} className={styles.gameCard}>
            <GameCard />
          </div>
        ))}
      </section>

      <form className={styles.clueForm}>
        <FormGroup type="text" placeholder="Your clue" />
        <Button shadow small style={{ marginTop: 8 }}>
          Give clue
        </Button>
      </form>
    </div>
  );
};

export default Playboard;
