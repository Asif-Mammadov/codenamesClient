import React, { useState } from 'react';
import Slide from 'react-reveal/Slide';
import Button from '../../elements/Button';
import styles from './Game.module.scss';
import FormGroup from '../../elements/FormGroup';
import Dropdown from '../../elements/Dropdown';
import Popup from '../../elements/Popup';
import { LANGS } from '../../../data/main';

const Game = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <div className={styles.game}>
      <div className={styles.gameBg}></div>

      <section className={styles.gameBody}>
        <Slide bottom>
          <div className={styles.gameContent}>
            <h1>
              WELCOME TO THE <span>GAME!</span>
            </h1>
            <div className={styles.buttonsWrapper}>
              <Button shadow clicked={() => setIsJoinOpen(true)}>
                Join Room
              </Button>
              <Button shadow type="white" clicked={() => setIsCreateOpen(true)}>
                Create Room
              </Button>
            </div>
          </div>
        </Slide>
      </section>

      {/* Create room popup */}
      <Popup
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Room"
      >
        <FormGroup
          label="Nickname"
          name="nickname"
          placeholder="eyvazahmadzada"
          type="text"
        />
        <div className={styles.modalLangGroup}>
          <label>Select Game Language</label>
          <Dropdown items={LANGS} upward />
        </div>

        <Button>Create Room</Button>
      </Popup>

      {/* Join room popup */}
      <Popup
        open={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join Room"
      >
        <FormGroup
          label="Nickname"
          name="nickname"
          placeholder="eyvazahmadzada"
          type="text"
          style={{ marginBottom: 24 }}
        />
        <FormGroup
          label="Room ID"
          name="roomId"
          placeholder="12345678"
          type="text"
          style={{ marginBottom: 36 }}
        />

        <Button>Join Room</Button>
      </Popup>
    </div>
  );
};

export default Game;
