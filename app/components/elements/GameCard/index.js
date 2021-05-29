import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Icon from '../Icon';
import styles from './GameCard.module.scss';

const GameCard = () => {
  const { width } = useWindowDimensions();

  return (
    <div className={styles.gameCard}>
      <Icon name={`spy${width <= 992 ? '-small' : ''}`} />
      <h6>Paper</h6>
    </div>
  );
};

export default GameCard;
