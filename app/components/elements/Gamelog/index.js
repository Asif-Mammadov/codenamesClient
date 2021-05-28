import React from 'react';
import styles from './Gamelog.module.scss';

const Gamelog = ({ translate }) => (
  <div className={styles.gamelog}>
    <div className={styles.boxHeader}>
      <h3>{translate('gamelog')}</h3>
    </div>

    <div className={styles.boxContent}>
      {Array.from({ length: 25 }).map((item) => (
        <div key={item} className={styles.record}>
          <span>Eyvaz </span>
          {translate('gives_clue')}
          <strong> My Clue-1</strong>
        </div>
      ))}
    </div>
  </div>
);

export default Gamelog;
