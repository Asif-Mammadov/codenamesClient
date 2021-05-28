import Link from 'next/link';
import React from 'react';
import Slide from 'react-reveal/Slide';
import { TEAM_MEMBERS } from '../../../data/main';
import Button from '../../elements/Button';
import TeamMember from '../../elements/TeamMember';
import DefaultLayout from '../../layouts/DefaultLayout';
import styles from './Home.module.scss';

const Home = ({ translate }) => {
  return (
    <DefaultLayout translate={translate}>
      <div className={styles.homeContainer}>
        {/* First page */}
        <section id="home" className={styles.page1}>
          <div className={styles.page1Bg}></div>
          <div className={styles.page1Body}>
            <Slide bottom>
              <div className={styles.page1Content}>
                <h1>{translate('home_header')}</h1>
                <p>{translate('home_text')}</p>
                <Link href="/game">
                  <a style={{ marginTop: 24, width: 'max-content' }}>
                    <Button icon="cards" shadow>
                      {translate('play_now')}
                    </Button>
                  </a>
                </Link>
              </div>
            </Slide>
          </div>
        </section>

        {/* Second page */}
        <section id="game-rules" className={styles.page2}>
          <div className={styles.page2Bg}></div>
          <div className={styles.page2Body}>
            <Slide bottom>
              <div className={styles.page2Content}>
                <h2>{translate('game_rules')}</h2>
                <p>{translate('rules_text')}</p>
                <a
                  href="https://cdn.1j1ju.com/medias/89/5e/99-codenames-rule.pdf"
                  target="_blank"
                  style={{ marginTop: 24, width: 'max-content' }}
                >
                  <Button icon="info" shadow>
                    {translate('learn_more')}
                  </Button>
                </a>
              </div>
            </Slide>
          </div>
        </section>

        {/* Third page */}
        <section id="about-us" className={styles.page3}>
          <div className={styles.page3Bg}></div>
          <div className={styles.page3Body}>
            <Slide bottom>
              <div className={styles.page3Content}>
                <h2>{translate('about_us')}</h2>
                <div className={styles.cardsContainer}>
                  {TEAM_MEMBERS.map((member) => (
                    <div className={styles.cardWrapper} key={member.name}>
                      <TeamMember
                        name={member.name}
                        position={member.position}
                        avatar={member.avatar}
                        socialMedia={member.socialMedia}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Slide>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Home;
