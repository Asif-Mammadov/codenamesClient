import React from 'react';
import AuthLayout from '../../app/components/layouts/AuthLayout';
import Login from '../../app/components/templates/Login';

const LoginPage = () => (
  <AuthLayout isLogin>
    <Login />
  </AuthLayout>
);

export default LoginPage;
