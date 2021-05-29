import React from 'react';
import Scorer from '../../elements/Scorer';
import TopScorer from '../../elements/TopScorer';
import AccountLayout from '../../layouts/AccountLayout';
import styles from './Scoreboard.module.scss';

const Scoreboard = ({ translate }) => {
  return (
    <AccountLayout translate={translate}>
      <div className={styles.scoreboard}>
        <section className={styles.topScorers}>
          {[1, 2, 3].map((scorer) => (
            <TopScorer
              key={scorer}
              name="Eyvaz Ahmadzada"
              img="eyvazahmadzada"
              score="12456"
              place={scorer}
              translate={translate}
              me={scorer === 1}
            />
          ))}
        </section>

        <section className={styles.scorers}>
          {[1, 2, 3, 4, 5, 6].map((scorer) => (
            <Scorer
              key={scorer}
              name="Eyvaz Ahmadzada"
              img="eyvazahmadzada"
              score="12456"
              place={scorer}
              translate={translate}
              me={scorer === 6}
            />
          ))}
        </section>
      </div>
    </AccountLayout>
  );
};

export default Scoreboard;
