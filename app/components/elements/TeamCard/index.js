import React from 'react';
import Button from '../Button';
import styles from './TeamCard.module.scss';

const TeamCard = ({ isRed, gameMode, translate }) => {
  return (
    <div className={[styles.teamCard, isRed ? styles.red : ''].join(' ')}>
      <img src={`/img/team-${isRed ? 'red' : 'blue'}.png`} />

      <div className={styles.teamCardContent}>
        {gameMode ? <h3>8</h3> : null}

        <section className={styles.roleWrapper}>
          <h6>{translate('operatives')}</h6>
          <div>
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className={[styles.player, item == 0 ? styles.me : ''].join(
                  ' '
                )}
              >
                <img src="/img/avatar.png" />
                <span>Eyvaz</span>
              </div>
            ))}
          </div>

          {!gameMode ? <Button extraSmall>{translate('join')}</Button> : null}
        </section>

        <section className={styles.roleWrapper}>
          <h6>{translate('spymasters')}</h6>
          <div>
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className={[styles.player, item == 0 ? styles.me : ''].join(
                  ' '
                )}
              >
                <img src="/img/avatar.png" />
                <span>Eyvaz</span>
              </div>
            ))}
          </div>

          {!gameMode ? <Button extraSmall>{translate('join')}</Button> : null}
        </section>
      </div>
    </div>
  );
};

export default TeamCard;
