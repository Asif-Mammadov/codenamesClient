import React from 'react';
import styles from './Gamelog.module.scss';

const Gamelog = ({ translate, clues }) => (
  <div className={styles.gamelog}>
    <div className={styles.boxHeader}>
      <h3>{translate('gamelog')}</h3>
    </div>

    <div className={styles.boxContent}>
      {clues.map((item) => (
        <div key={item.clue} className={styles.record}>
          <span>{item.name} </span>
          {translate('gives_clue')}
          <strong>
            {' '}
            {item.clue}-{item.count}
          </strong>
        </div>
      ))}
    </div>
  </div>
);

export default Gamelog;
