import React from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import History from '../../../app/components/templates/History';

const HistoryPage = () => {
  const { t } = useTranslation();

  return <History translate={t} />;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default HistoryPage;
