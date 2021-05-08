import React from 'react';

import Icon from '../Icon';
import styles from './TeamMember.module.scss';

const TeamMember = ({ name, position, avatar, socialMedia }) => (
  <div className={styles.teamMember}>
    <img src={`/img/${avatar}.png`}></img>
    <div className={styles.content}>
      <div className={styles.info}>
        <h6>{name}</h6>
        <p>{position}</p>
      </div>
      <div className={styles.linksWrapper}>
        {Object.entries(socialMedia).map(([media, link]) => (
          <a
            key={media}
            className={styles[media]}
            href={media === 'email' ? `mailto:${link}` : link}
            target="_blank"
          >
            <Icon name={media} width="24" height="24"></Icon>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default TeamMember;
