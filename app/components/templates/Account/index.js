import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import withAuth from '../../../hoc/withAuth';
import utils from '../../../utils';
import Button from '../../elements/Button';
import FormError from '../../elements/FormError';
import FormGroup from '../../elements/FormGroup';
import AccountLayout from '../../layouts/AccountLayout';
import styles from './Account.module.scss';
import {
  updateDetails,
  resetPassword,
  showAuthMessage,
  hideAuthMessage,
  showAuthLoading
} from '../../../store/actions/Auth';
import Message from '../../elements/Message';
import Spinner from '../../elements/Spinner';

const Account = ({
  translate,
  updateDetails,
  resetPassword,
  details,
  loading,
  showMessage,
  successMessage,
  hideAuthMessage,
  showAuthLoading
}) => {
  /* Make sure ids that get generated on the server match that of the browser */
  resetIdCounter();

  // Initialize the account details form
  const [detailsForm, setDetailsForm] = useState({
    controls: {
      fullName: {
        name: 'fullName',
        type: 'text',
        label: translate('full_name'),
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
        label: translate('email'),
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
        label: translate('new_password'),
        placeholder: translate('password'),
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
        label: translate('confirm_password'),
        placeholder: translate('password'),
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

  for (const key in currentForm.controls) {
    formElements.push({
      id: key,
      config: currentForm.controls[key]
    });
  }

  console.log(loading);

  useEffect(() => {
    if (details) {
      const updatedForm = {
        ...currentForm,
        controls: {
          ...currentForm.controls,
          email: {
            ...currentForm.controls.email,
            value: details[0].Email || '',
            valid: true
          },
          fullName: {
            ...currentForm.controls.fullName,
            value: details[0].Username || '',
            valid: true
          }
        },
        valid: true
      };

      setDetailsForm(updatedForm);
      setCurrentForm(updatedForm);
    }
  }, [details]);

  useEffect(() => {
    // Clear form error after some time
    const errorTimeout = setTimeout(
      () => setCurrentForm({ ...currentForm, error: '' }),
      2000
    );

    let successTimeout;
    if (showMessage) {
      successTimeout = setTimeout(() => hideAuthMessage(), 2000);
    }

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  });

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
        showAuthLoading();
        updateDetails({
          name: currentForm.controls.fullName.value,
          email: currentForm.controls.email.value
        });

        // Update details form
        setDetailsForm(currentForm);
      } else {
        // Handle reset password
        if (
          // If passwords match
          currentForm.controls.newPassword.value.trim() ===
          currentForm.controls.confirmPassword.value.trim()
        ) {
          showAuthLoading();
          resetPassword({
            current: currentForm.controls.newPassword.value.trim(),
            confirm: currentForm.controls.confirmPassword.value.trim()
          });
        } else {
          error = translate('pass_no_match');
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
      <FormError error={translate(currentForm.error)} />

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
          translate={translate}
          style={{ width: '100%', marginBottom: 24 }}
          changed={(e) => onValueChange(el.id, e.target.value)}
        />
      ))}

      <Button small disabled={!currentForm.valid} style={{ margin: '0 auto' }}>
        {translate('save')}
      </Button>
    </form>
  );

  return (
    <AccountLayout
      translate={translate}
      name={detailsForm.controls.fullName.value.split(' ')[0]}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Message show={showMessage} msg={successMessage} />
          <Tabs
            className={styles.tabs}
            onSelect={(index) => onTabChange(index)}
            tabIndex={currentIndex}
          >
            <TabList className={styles.tabList}>
              <Tab
                className={styles.tab}
                selectedClassName={styles.tabSelected}
              >
                {translate('account_details')}
              </Tab>
              <Tab
                className={styles.tab}
                selectedClassName={styles.tabSelected}
              >
                {translate('reset_password')}
              </Tab>
            </TabList>

            <TabPanel className={styles.tabPanel}>{renderForm()}</TabPanel>
            <TabPanel className={styles.tabPanel}>{renderForm()}</TabPanel>
          </Tabs>
        </>
      )}
    </AccountLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { details, loading, showMessage, successMessage } = auth;
  return { details, loading, showMessage, successMessage };
};

export default connect(mapStateToProps, {
  updateDetails,
  resetPassword,
  showAuthMessage,
  hideAuthMessage,
  showAuthLoading
})(withAuth(Account));
