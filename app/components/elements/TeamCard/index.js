import React from 'react';
import Button from '../Button';
import styles from './TeamCard.module.scss';

const TeamCard = ({ isRed }) => {
  return (
    <div className={[styles.teamCard, isRed ? styles.red : ''].join(' ')}>
      <img src={`/img/team-${isRed ? 'red' : 'blue'}.png`} />

      <div className={styles.teamCardContent}>
        <h3>8</h3>

        <section className={styles.roleWrapper}>
          <h6>Operatives</h6>
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
          <Button extraSmall>Join as operative</Button>
        </section>

        <section className={styles.roleWrapper}>
          <h6>Spymasters</h6>
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

          <Button extraSmall>Join as spymaster</Button>
        </section>
      </div>
    </div>
  );
};

export default TeamCard;
