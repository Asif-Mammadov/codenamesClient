import React, { useState } from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import GameCard from '../../elements/GameCard';
import TeamCard from '../../elements/TeamCard';
import Gamelog from '../../elements/Gamelog';
import styles from './Playboard.module.scss';
import Chat from '../../elements/Chat';
import utils from '../../../utils';

const ClueForm = ({ isMobile, translate }) => {
  const [clueForm, setClueForm] = useState({
    controls: {
      clue: {
        name: 'clue',
        type: 'text',
        placeholder: translate('your_clue'),
        value: '',
        validation: {
          required: true
        },
        style: {
          width: '100%',
          marginRight: 8
        }
      },
      count: {
        name: 'count',
        type: 'number',
        placeholder: '0',
        validation: {
          required: true
        },
        value: ''
      }
    },
    valid: false
  });

  // Create an array containing the form elements
  const formElements = [];
  for (const key in clueForm.controls) {
    formElements.push({
      id: key,
      config: clueForm.controls[key]
    });
  }

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      clueForm.controls,
      itemId,
      value
    );

    setClueForm({ controls: updatedForm, valid: formValid });
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (clueForm.valid) {
      console.log(clueForm);
    }
  };

  return (
    <form
      className={[styles.clueForm, isMobile ? styles.mobile : ''].join(' ')}
      onSubmit={submitHandler}
    >
      <div>
        {formElements.map((el) => (
          <FormGroup
            name={el.config.name}
            type={el.config.type}
            placeholder={el.config.placeholder}
            translate={translate}
            style={el.config?.style}
            changed={(e) => onValueChange(el.id, e.target.value)}
          />
        ))}
      </div>

      <Button
        shadow
        small
        disabled={!clueForm.valid}
        style={{ marginTop: 8, width: '100%' }}
      >
        {translate('give_clue')}
      </Button>
    </form>
  );
};

const GameArea = ({ isMobile }) => (
  <div className={[styles.gameArea, isMobile ? styles.mobile : ''].join(' ')}>
    {Array.from({ length: 25 }).map((item) => (
      <div key={item} className={styles.gameCard}>
        <GameCard />
      </div>
    ))}
  </div>
);

const Playboard = ({ translate }) => {
  return (
    <div className={styles.boardContainer}>
      {/* Game section */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <TeamCard translate={translate} isRed gameMode />
        </section>

        <GameArea />

        <section className={styles.sectionWrapper}>
          <TeamCard translate={translate} gameMode />
        </section>
      </div>

      {/* Game area for mobile */}
      <GameArea isMobile />

      {/* Clue form for mobile */}
      <ClueForm translate={translate} isMobile />

      {/* Log, chat, clue sections */}
      <div className={styles.boardRow}>
        <section className={styles.sectionWrapper}>
          <Gamelog translate={translate} />
        </section>

        <ClueForm translate={translate} />

        <section className={styles.sectionWrapper}>
          <Chat translate={translate} />
        </section>
      </div>
    </div>
  );
};

export default Playboard;
