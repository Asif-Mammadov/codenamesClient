import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Icon from '../Icon';
import styles from './GameCard.module.scss';

const GameCard = ({ label, word, isSelected, clicked }) => {
  const { width } = useWindowDimensions();

  const rand = Math.floor(Math.random() * 8 + 1);

  return isSelected ? (
    <img src={`/img/${label}-${rand}.png`} />
  ) : (
    <div className={styles.gameCard} onClick={clicked}>
      <Icon name={`spy${width <= 992 ? '-small' : ''}`} />
      <h6>{word}</h6>
    </div>
  );
};

export default GameCard;
