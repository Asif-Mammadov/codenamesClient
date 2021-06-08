import React from 'react';
import styles from './Gamelog.module.scss';

const Gamelog = ({ translate, clues }) => (
  <div className={styles.gamelog}>
    <div className={styles.boxHeader}>
      <h3>{translate('gamelog')}</h3>
    </div>

    <div className={styles.boxContent}>
      {clues.map((item) => (
        <div key={item.clueWord} className={styles.record}>
          <span>{item.player}</span>
          <em>{translate('gives_clue')}</em>
          <strong>
            {item.clueWord}-{item.clueNum}
          </strong>
        </div>
      ))}
    </div>
  </div>
);

export default Gamelog;
