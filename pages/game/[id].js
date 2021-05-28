import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GameLayout from '../../app/components/layouts/GameLayout';
import Playboard from '../../app/components/templates/Playboard';
import Room from '../../app/components/templates/Room';

const RoomPage = () => {
  const { t } = useTranslation();

  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <GameLayout translate={t}>
      {isGameStarted ? (
        <Playboard translate={t} />
      ) : (
        <Room translate={t} gameStarted={() => setIsGameStarted(true)} />
      )}
    </GameLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default RoomPage;
