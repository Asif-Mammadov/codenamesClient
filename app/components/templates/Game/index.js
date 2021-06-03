import React, { useContext, useState } from 'react';
import Slide from 'react-reveal/Slide';
import Button from '../../elements/Button';
import styles from './Game.module.scss';
import FormGroup from '../../elements/FormGroup';
import Dropdown from '../../elements/Dropdown';
import Popup from '../../elements/Popup';
import { LANGS } from '../../../data/main';
import utils from '../../../utils';
import DefaultLayout from '../../layouts/DefaultLayout';
import { useRouter } from 'next/router';
import { useSocket } from '../../../contexts/SocketProvider';

const RoomForm = ({ isCreate, translate }) => {
  // Initialize the join form
  const [form, setForm] = useState({
    controls: {
      nickname: {
        name: 'nickname',
        label: translate('nickname'),
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
        label: translate('room_id'),
        type: 'text',
        value: '',
        placeholder: 'codenames-room',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      }
    },
    valid: false,
    error: ''
  });
  const router = useRouter();

  // Get socket connection
  const socket = useSocket();

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
    console.log(socket);
    const { updatedForm, formValid } = utils.valueChangedHandler(
      form.controls,
      itemId,
      value
    );

    setForm({ controls: updatedForm, valid: formValid });
  };

  // Check nickname on join or create
  const handleEnterRoom = (nicknameValid, room) => {
    // If not valid
    if (!nicknameValid) {
      setForm({
        ...form,
        error: 'This nickname is already being used'
      });
    } else {
      // Navigate to the room page
      router.push([`game/${room}`]);
    }
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (form.valid) {
      if (isCreate) {
        // Tell server to create a room
        socket.emit('create', form.controls.nickname.value);

        // Get room id from the server
        socket.on('room', (room) => {
          // Check nickname
          socket.on('nicknameChecked', (isValid) => {
            handleEnterRoom(isValid, room);
          });
        });
      } else {
        // Tell server to join a room
        socket.emit(
          'join',
          form.controls.nickname.value,
          form.controls.roomId.value
        );

        // Check nickname
        socket.on('nicknameChecked', (isValid) => {
            handleEnterRoom(isValid, form.controls.roomId.value);
        });
      }
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
          translate={translate}
          changed={(e) => onValueChange(el.id, e.target.value)}
          style={{ width: '100%', marginBottom: 24 }}
        />
      ))}

      {isCreate ? (
        <div className={styles.popupLangGroup}>
          <label>{translate('select_lang')}</label>
          <Dropdown items={LANGS} upward />
        </div>
      ) : null}

      <Button disabled={!form.valid} style={{ margin: '0 auto' }}>
        {translate(isCreate ? 'create_room' : 'join_room')}
      </Button>
    </form>
  );
};

const Game = ({ translate }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <DefaultLayout translate={translate}>
      <div className={styles.game}>
        <div className={styles.gameBg}></div>

        <section className={styles.gameBody}>
          <Slide bottom>
            <div className={styles.gameContent}>
              <h1>{translate('welcome_game')}</h1>
              <div className={styles.buttonsWrapper}>
                <Button shadow clicked={() => setIsJoinOpen(true)}>
                  {translate('join_room')}
                </Button>
                <Button
                  shadow
                  type="white"
                  clicked={() => setIsCreateOpen(true)}
                >
                  {translate('create_room')}
                </Button>
              </div>
            </div>
          </Slide>
        </section>

        {/* Create room popup */}
        <Popup
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title={translate('create_room')}
        >
          <RoomForm translate={translate} isCreate />
        </Popup>

        {/* Join room popup */}
        <Popup
          open={isJoinOpen}
          onClose={() => setIsJoinOpen(false)}
          title={translate('join_room')}
        >
          <RoomForm translate={translate} />
        </Popup>
      </div>
    </DefaultLayout>
  );
};

export default Game;
