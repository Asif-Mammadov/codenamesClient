import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DefaultLayout from '../app/components/layouts/DefaultLayout';
import Home from '../app/components/templates/Home';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <Home translate={t} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer']))
  }
});

export default HomePage;
