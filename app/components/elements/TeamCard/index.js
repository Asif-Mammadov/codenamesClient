import React from 'react';
import Button from '../Button';
import styles from './TeamCard.module.scss';

const TeamCard = ({
  isRed,
  gameMode,
  translate,
  operatives,
  spymaster,
  joinAsOps,
  joinAsSpy,
  myUsername,
  score
}) => {
  return (
    <div className={[styles.teamCard, isRed ? styles.red : ''].join(' ')}>
      <img src={`/img/team-${isRed ? 'red' : 'blue'}.png`} />

      <div className={styles.teamCardContent}>
        {gameMode ? <h3>{score}</h3> : null}

        <section className={styles.roleWrapper}>
          <h6>{translate('operatives')}</h6>
          <div>
            {operatives.map((item) =>
              item.username ? (
                <div
                  key={item.username}
                  className={[
                    styles.player,
                    item.username === myUsername ? styles.me : ''
                  ].join(' ')}
                >
                  <img src="/img/avatar.png" />
                  <span>{item.username}</span>
                </div>
              ) : null
            )}
          </div>

          {!gameMode ? (
            <Button extraSmall clicked={joinAsOps}>
              {translate('join')}
            </Button>
          ) : null}
        </section>

        <section className={styles.roleWrapper}>
          <h6>{translate('spymasters')}</h6>
          <div>
            {spymaster.username ? (
              <div
                className={[
                  styles.player,
                  spymaster.username === myUsername ? styles.me : ''
                ].join(' ')}
              >
                <img src="/img/avatar.png" />
                <span>{spymaster.username}</span>
              </div>
            ) : null}
          </div>

          {!gameMode ? (
            <Button extraSmall clicked={joinAsSpy}>
              {translate('join')}
            </Button>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default TeamCard;
