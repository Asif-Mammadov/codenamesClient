import React from 'react';
import Icon from '../Icon';
import styles from './Scorer.module.scss';

const Scorer = ({ img, name, place, score, me, translate }) => (
  <section className={[styles.scorer, me ? styles.me : ''].join(' ')}>
    <div className={styles.imgWrapper}>
      <img src={`/img/${img}.png`} />
      <span>{me ? translate('you') : name}</span>
    </div>

    <div className={styles.scoreWrapper}>
      <Icon name="star" width="24" height="24" style={{ marginRight: 8 }} />
      <span>{score}</span>
    </div>

    <span>#{place}</span>
  </section>
);

export default Scorer;
