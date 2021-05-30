import React from 'react';
import GameCard from '../../elements/GameCard';
import styles from './GameArea.module.scss';

const GameArea = ({ isMobile, board, labels, spymaster, selectCard }) => (
  <div className={[styles.gameArea, isMobile ? styles.mobile : ''].join(' ')}>
    {board.map((item, index) => (
      <div key={item.word} className={styles.gameCard}>
        <GameCard
          label={spymaster ? labels[index] : item.label}
          word={board.word}
          isSelected={item.label !== 'n'}
          clicked={() => selectCard(index)}
        />
      </div>
    ))}
  </div>
);

export default GameArea;
