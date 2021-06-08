import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Icon from '../Icon';
import styles from './GameCard.module.scss';

const GameCard = ({ label, word, isSelected, spymaster, clicked }) => {
  const { width } = useWindowDimensions();

  const rand = Math.floor(Math.random() * 8 + 1);

  return (
    <div
      className={[styles.gameCard, spymaster ? styles[label] : ''].join(' ')}
      onClick={clicked}
    >
      {isSelected ? (
        <img
          src={
            label === 'r' || label === 'b'
              ? `/img/${label}${rand}.png`
              : `/img/${label}.png`
          }
        />
      ) : (
        <div>
          <Icon name={`spy${width <= 992 ? '-small' : ''}`} />
          <h6>{word}</h6>
        </div>
      )}
    </div>
  );
};

export default GameCard;
