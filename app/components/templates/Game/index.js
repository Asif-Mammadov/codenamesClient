import React, { useState } from 'react';
import Slide from 'react-reveal/Slide';
import Button from '../../elements/Button';
import styles from './Game.module.scss';
import FormGroup from '../../elements/FormGroup';
import Dropdown from '../../elements/Dropdown';
import Popup from '../../elements/Popup';
import { LANGS } from '../../../data/main';
import utils from '../../../utils';

const RoomForm = ({ isCreate }) => {
  // Initialize the join form
  const [form, setForm] = useState({
    controls: {
      nickname: {
        name: 'nickname',
        label: 'Nickname',
        type: 'text',
        value: '',
        placeholder: 'eyvazahmadzada',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      roomId: {
        name: 'roomId',
        label: 'Room ID',
        type: 'text',
        value: '',
        placeholder: '12345678',
        validation: {
          required: true,
          id: true
        },
        valid: false,
        touched: false,
        error: ''
      }
    },
    valid: false,
    error: ''
  });

  // No need for room id in create form
  if (isCreate) {
    delete form.controls.roomId;
  }

  // Create an array containing the form elements
  const formElements = [];
  for (const key in form.controls) {
    formElements.push({
      id: key,
      config: form.controls[key]
    });
  }

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      form.controls,
      itemId,
      value
    );

    setForm({ controls: updatedForm, valid: formValid });
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (form.valid) {
      console.log(form.controls);
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ width: '100%' }}>
      {formElements.map((el) => (
        <FormGroup
          key={el.id}
          name={el.config.name}
          label={el.config.label}
          type={el.config.type}
          value={el.config.value}
          placeholder={el.config.placeholder}
          error={el.config.touched && !el.config.valid ? el.config.error : ''}
          changed={(e) => onValueChange(el.id, e.target.value)}
          style={{ width: '100%', marginBottom: 24 }}
        />
      ))}

      {isCreate ? (
        <div className={styles.popupLangGroup}>
          <label>Select Game Language</label>
          <Dropdown items={LANGS} upward />
        </div>
      ) : null}

      <Button disabled={!form.valid} style={{ margin: '0 auto' }}>
        {isCreate ? 'Create' : 'Join'} Room
      </Button>
    </form>
  );
};

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
        <RoomForm isCreate />
      </Popup>

      {/* Join room popup */}
      <Popup
        open={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join Room"
      >
        <RoomForm />
      </Popup>
    </div>
  );
};

export default Game;
