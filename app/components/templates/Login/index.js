import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import utils from '../../../utils';
import AuthLayout from '../../layouts/AuthLayout';
import { signIn } from '../../../store/actions';

const Login = ({ translate, signIn }) => {
  // Initialize the login form
  const [loginForm, setLoginForm] = useState({
    controls: {
      email: {
        name: 'email',
        type: 'email',
        placeholder: translate('email'),
        icon: 'envelope',
        validation: {
          required: true,
          email: true
        },
        value: '',
        valid: false,
        touched: false,
        error: ''
      },
      password: {
        name: 'password',
        type: 'password',
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

  // Create an array containing the form elements
  const formElements = [];
  for (const key in loginForm.controls) {
    formElements.push({
      id: key,
      config: loginForm.controls[key]
    });
  }

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      loginForm.controls,
      itemId,
      value
    );

    setLoginForm({ controls: updatedForm, valid: formValid });
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (loginForm.valid) {
      console.log(loginForm);

      setLoginForm({ ...loginForm, error: 'Invalid credentials' });

      // Clear error after some time
      setTimeout(() => setLoginForm({ ...loginForm, error: '' }), 2000);
    }
  };

  return (
    <AuthLayout
      translate={translate}
      isLogin
      submitted={submitHandler}
      error={loginForm.error}
    >
      {formElements.map((el) => (
        <FormGroup
          key={el.id}
          name={el.config.name}
          type={el.config.type}
          value={el.config.value}
          placeholder={el.config.placeholder}
          icon={el.config.icon}
          error={el.config.touched && !el.config.valid ? el.config.error : ''}
          translate={translate}
          changed={(e) => onValueChange(el.id, e.target.value)}
          style={{ width: '100%', marginBottom: 24 }}
        />
      ))}

      <Button disabled={!loginForm.valid}>{translate('login')}</Button>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, errorMessages } = auth;
  return { loading, errorMessages };
};

export default connect(mapStateToProps, { signIn })(Login);
