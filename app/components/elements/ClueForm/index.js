import React, { useState } from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import styles from './ClueForm.module.scss';
import utils from '../../../utils';

const ClueForm = ({ isMobile, translate, enterClue }) => {
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
      enterClue({
        word: clueForm.controls.clue.value,
        count: clueForm.controls.count.value
      });
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

export default ClueForm;
