import React from 'react';
import styles from './TopScorer.module.scss';

const TopScorer = ({ img, name, score, place, me }) => (
  <div
    className={[
      styles.topScorer,
      place === 1 ? styles.first : '',
      me ? styles.me : ''
    ].join(' ')}
    style={{ order: place === 1 ? 2 : place - 1 }}
  >
    <div className={styles.imgWrapper}>
      <img src={`/img/${img}.png`} />
      <span>{place}</span>
    </div>
    <h6>{me ? 'You' : name}</h6>
    <span>{score}</span>
  </div>
);

export default TopScorer;
