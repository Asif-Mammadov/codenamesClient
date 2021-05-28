import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Scoreboard from '../../../app/components/templates/Scoreboard';

const ScoreboardPage = () => {
  const { t } = useTranslation();

  return <Scoreboard translate={t} />;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default ScoreboardPage;
