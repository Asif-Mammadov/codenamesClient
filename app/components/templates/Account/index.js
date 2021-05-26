import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import utils from '../../../utils';
import Button from '../../elements/Button';
import FormError from '../../elements/FormError';
import FormGroup from '../../elements/FormGroup';
import Icon from '../../elements/Icon';
import styles from './Account.module.scss';

const Account = () => {
  /* Make sure ids that get generated on the server match that of the browser */
  resetIdCounter();

  // Initialize the account details form
  const [detailsForm, setDetailsForm] = useState({
    controls: {
      fullName: {
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Eyvaz Ahmadzada',
        icon: 'user',
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false,
        error: ''
      },
      email: {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'eyvaz.ahmedzade.12@gmail.com',
        icon: 'envelope',
        validation: {
          required: true,
          email: true
        },
        value: '',
        valid: false,
        touched: false,
        error: ''
      }
    },
    valid: false,
    error: ''
  });

  // Initialize the reset password form
  const [resetForm, setResetForm] = useState({
    controls: {
      newPassword: {
        name: 'newPassword',
        type: 'password',
        label: 'New Password',
        placeholder: 'Password',
        icon: 'lock',
        validation: {
          required: true,
          min: 6
        },
        value: '',
        valid: false,
        touched: false,
        error: ''
      },
      confirmPassword: {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Password',
        icon: 'lock',
        validation: {
          required: true,
          min: 6
        },
        value: '',
        valid: false,
        touched: false,
        error: ''
      }
    },
    valid: false,
    error: ''
  });

  // Store the state of current form
  const [currentForm, setCurrentForm] = useState(detailsForm);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create an array containing the form elements
  const formElements = [];

  // Timeout for showing and clearing errors
  let errorTimeout;

  for (const key in currentForm.controls) {
    formElements.push({
      id: key,
      config: currentForm.controls[key]
    });
  }

  useEffect(() => {
    // Clear form error after some time
    errorTimeout = setTimeout(
      () => setCurrentForm({ ...currentForm, error: '' }),
      2000
    );

    return () => clearTimeout(errorTimeout);
  }, [currentForm]);

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      currentForm.controls,
      itemId,
      value
    );

    setCurrentForm({ controls: updatedForm, valid: formValid });
  };

  // Handle tab change
  const onTabChange = (index) => {
    // Check if the index changes
    if (index !== currentIndex) {
      index === 0
        ? setResetForm({ ...currentForm, error: '' })
        : setDetailsForm({ ...currentForm, error: '' });

      // Update current form whenever the tab changes
      setCurrentForm(index === 0 ? detailsForm : resetForm);

      // Update tab index and
      setCurrentIndex(index);
    }
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (currentForm.valid) {
      let error;

      // Handle account details
      if (currentIndex === 0) {
        console.log('Details form: ', currentForm);
      } else {
        // Handle reset password
        if (
          // If passwords match
          currentForm.controls.newPassword.value.trim() ===
          currentForm.controls.confirmPassword.value.trim()
        ) {
          console.log(currentForm);
        } else {
          error = "Passwords didn't match!";
        }
      }

      if (error) {
        setCurrentForm({ ...currentForm, error });
      }
    }
  };

  // Render current form
  const renderForm = () => (
    <form onSubmit={submitHandler}>
      {currentForm.error ? <FormError error={currentForm.error} /> : null}

      {formElements.map((el) => (
        <FormGroup
          key={el.id}
          name={el.config.name}
          type={el.config.type}
          value={el.config.value}
          placeholder={el.config.placeholder}
          label={el.config.label}
          icon={el.config.icon}
          error={el.config.touched && !el.config.valid ? el.config.error : ''}
          style={{ width: '100%', marginBottom: 24 }}
          changed={(e) => onValueChange(el.id, e.target.value)}
        />
      ))}

      <Button small disabled={!currentForm.valid} style={{ margin: '0 auto' }}>
        Save
      </Button>
    </form>
  );

  return (
    <Tabs
      className={styles.tabs}
      onSelect={(index) => onTabChange(index)}
      tabIndex={currentIndex}
    >
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Account Details
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Reset Password
        </Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>{renderForm()}</TabPanel>
      <TabPanel className={styles.tabPanel}>{renderForm()}</TabPanel>
    </Tabs>
  );
};

export default Account;
