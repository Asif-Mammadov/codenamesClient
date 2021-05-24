import React, { useState } from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import utils from '../../../utils';
import AuthLayout from '../../layouts/AuthLayout';

const Login = () => {
  // Initialize the login form
  const [loginForm, setLoginForm] = useState({
    email: {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
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
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Create an array containing the form elements
  const formElements = [];
  for (const key in loginForm) {
    formElements.push({
      id: key,
      config: loginForm[key]
    });
  }

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      loginForm,
      itemId,
      value
    );

    setLoginForm(updatedForm);
    setIsFormValid(formValid);
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log(loginForm);
    }
  };

  return (
    <AuthLayout isLogin submitted={submitHandler}>
      {formElements.map((el) => (
        <FormGroup
          key={el.id}
          name={el.config.name}
          type={el.config.type}
          value={el.config.value}
          placeholder={el.config.placeholder}
          icon={el.config.icon}
          error={el.config.touched && !el.config.valid ? el.config.error : ''}
          changed={(e) => onValueChange(el.id, e.target.value)}
          style={{ width: '100%', marginBottom: 24 }}
        />
      ))}

      <Button disabled={!isFormValid}>Login</Button>
    </AuthLayout>
  );
};

export default Login;
