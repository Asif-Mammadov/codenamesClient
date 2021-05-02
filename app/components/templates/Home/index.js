import React from 'react';
import Fade from 'react-reveal/Fade';

import Button from '../../elements/Button';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* First page */}
      <section id="home" className={styles.page1}>
        <div className={styles.page1Bg}></div>
        <div className={styles.page1Body}>
          <Fade delay={200} big>
            <div className={styles.page1Content}>
              <h1>TOP SECRET WORD GAME</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p>
              <Button icon="cards" shadow style={{ marginTop: 24 }}>
                Play now
              </Button>
            </div>
          </Fade>
        </div>
      </section>

      {/* Second page */}
      <section id="game-rules" className={styles.page2}>
        <div className={styles.page2Bg}></div>
        <div className={styles.page2Body}>
          <Fade delay={200} big>
            <div className={styles.page2Content}>
              <h1>GAME RULES</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p>
              <Button icon="info" shadow style={{ marginTop: 24 }}>
                Learn more
              </Button>
            </div>
          </Fade>
        </div>
      </section>

      {/* Third page */}
      <section id="about-us" className={styles.page3}>
        <div className={styles.page3Bg}></div>
        <div className={styles.page3Body}>
          <div className={styles.page3Content}></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
