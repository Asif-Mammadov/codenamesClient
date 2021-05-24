import React, { useState } from 'react';
import utils from '../../../utils';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import AuthLayout from '../../layouts/AuthLayout';

const Register = () => {
  // Initialize the register form
  const [registerForm, setRegisterForm] = useState({
    fullName: {
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
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
  for (const key in registerForm) {
    formElements.push({
      id: key,
      config: registerForm[key]
    });
  }

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      registerForm,
      itemId,
      value
    );

    setRegisterForm(updatedForm);
    setIsFormValid(formValid);
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log(registerForm);
    }
  };

  return (
    <AuthLayout submitted={submitHandler}>
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

      <Button disabled={!isFormValid}>Register</Button>
    </AuthLayout>
  );
};
export default Register;
