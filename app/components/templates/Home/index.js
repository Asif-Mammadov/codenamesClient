import React from 'react';
import Fade from 'react-reveal/Fade';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* First page */}
      <section id="home" className={styles.page1}>
        <div className={styles.page1Bg}></div>
        <div className={styles.page1Body}>
          <div className={styles.page1Content}></div>
        </div>
      </section>

      {/* Second page */}
      <section id="game-rules" className={styles.page2}>
        <div className={styles.page2Bg}></div>
        <div className={styles.page2Body}>
          <Fade big>
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
