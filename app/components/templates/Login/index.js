import React from 'react';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';

const Login = () => {
  return (
    <>
      <FormGroup
        name="email"
        type="email"
        placeholder="Email"
        icon="envelope"
        style={{ marginBottom: 24 }}
      />
      <FormGroup
        name="password"
        type="password"
        placeholder="Password"
        icon="lock"
        style={{ marginBottom: 24 }}
      />
      <Button>Login</Button>
    </>
  );
};

export default Login;
