import React from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Login from '../../app/components/templates/Login';

const LoginPage = () => {
  const { t } = useTranslation();

  return <Login translate={t} />;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default LoginPage;
