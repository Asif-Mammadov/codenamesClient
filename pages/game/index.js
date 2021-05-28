import React from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Game from '../../app/components/templates/Game';

const GamePage = () => {
  const { t } = useTranslation();

  return <Game translate={t} />;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default GamePage;
