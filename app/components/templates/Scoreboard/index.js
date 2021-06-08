import React, { useEffect } from 'react';
import Scorer from '../../elements/Scorer';
import TopScorer from '../../elements/TopScorer';
import AccountLayout from '../../layouts/AccountLayout';
import styles from './Scoreboard.module.scss';
import withAuth from '../../../hoc/withAuth';
import { connect } from 'react-redux';

const Scoreboard = ({ translate, scoreboard }) => {
  useEffect(() => {
    console.log(scoreboard);
  }, [scoreboard]);

  return (
    <AccountLayout translate={translate}>
      <div className={styles.scoreboard}>
        <section className={styles.topScorers}>
          {[scoreboard[1], scoreboard[0], scoreboard[2]].map(
            (scorer, index) => (
              <TopScorer
                key={scorer.Username}
                name={scorer.Username}
                img="eyvazahmadzada"
                score={scorer.score}
                place={index}
                translate={translate}
                me={scorer.Username === 'You'}
              />
            )
          )}
        </section>

        <section className={styles.scorers}>
          {scoreboard.splice(0, 3).map((scorer, index) => (
            <Scorer
              key={scorer.Username}
              name={scorer.Username}
              img="eyvazahmadzada"
              score={scorer.score}
              place={index + 3}
              translate={translate}
              me={scorer.Username === 'You'}
            />
          ))}
        </section>
      </div>
    </AccountLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { scoreboard } = auth;
  return { scoreboard };
};

export default connect(mapStateToProps, null)(Scoreboard);
