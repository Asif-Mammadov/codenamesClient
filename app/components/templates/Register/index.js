import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import utils from '../../../utils';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';
import { showAuthLoading, signUp } from '../../../store/actions/Auth';
import AuthLayout from '../../layouts/AuthLayout';
import WithoutAuth from '../../../hoc/WithoutAuth';

const Register = ({
  translate,
  signUp,
  showAuthLoading,
  loading,
  errorMessage,
  showMessage,
  token,
  redirect
}) => {
  // Initialize the register form
  const [registerForm, setRegisterForm] = useState({
    controls: {
      fullName: {
        name: 'fullName',
        type: 'text',
        placeholder: translate('full_name'),
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
    valid: false
  });
  const router = useRouter();

  // Create an array containing the form elements
  const formElements = [];
  for (const key in registerForm.controls) {
    formElements.push({
      id: key,
      config: registerForm.controls[key]
    });
  }

  useEffect(() => {
    if (token !== null) {
      router.push([redirect]);
    }
    if (showMessage) {
      setRegisterForm({ ...registerForm, error: errorMessage });

      // Clear error after some time
      setTimeout(() => setRegisterForm({ ...registerForm, error: '' }), 2000);
    }
  }, [token, showMessage]);

  // Handle value change of a control
  const onValueChange = (itemId, value) => {
    const { updatedForm, formValid } = utils.valueChangedHandler(
      registerForm.controls,
      itemId,
      value
    );

    setRegisterForm({ controls: updatedForm, valid: formValid });
  };

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (registerForm.valid) {
      showAuthLoading();
      signUp({
        name: registerForm.controls.fullName.value,
        email: registerForm.controls.email.value,
        password: registerForm.controls.password.value
      });
    }
  };

  return (
    <AuthLayout
      submitted={submitHandler}
      error={registerForm.error}
      loading={loading}
      translate={translate}
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

      <Button disabled={!registerForm.valid}>{translate('register')}</Button>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, errorMessage, showMessage, token, redirect } = auth;
  return { loading, errorMessage, showMessage, token, redirect };
};

export default connect(mapStateToProps, { signUp, showAuthLoading })(
  WithoutAuth(Register)
);
