import React from 'react';
import Auth from '../../app/components/layouts/Auth';
import Login from '../../app/components/templates/Login';

const LoginPage = () => (
  <Auth isLogin>
    <Login />
  </Auth>
);

export default LoginPage;
