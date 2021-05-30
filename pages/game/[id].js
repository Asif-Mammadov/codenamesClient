import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GameLayout from '../../app/components/layouts/GameLayout';
import Playboard from '../../app/components/templates/Playboard';
import Room from '../../app/components/templates/Room';

const RoomPage = () => {
  const { t } = useTranslation();

  const [isGameStarted, setIsGameStarted] = useState(false);

  // Game info
  const [player, setPlayer] = useState({
    name: '',
    team: '',
    isSpymaster: false,
    yourTurn: false,
    canGuess: false
  });
  const [players, setPlayers] = useState();

  // Common config for game pages
  const gameConfig = {
    translate: t,
    updatePlayers: (updatedPlayers) =>
      setPlayers({ ...updatedPlayers, ...players }),
    updatePlayer: (updatedPlayer) => setPlayer({ ...updatedPlayer, ...player }),
    player,
    players
  };

  return (
    <GameLayout translate={t}>
      {isGameStarted ? (
        <Playboard {...gameConfig} />
      ) : (
        <Room gameStarted={() => setIsGameStarted(true)} {...gameConfig} />
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
