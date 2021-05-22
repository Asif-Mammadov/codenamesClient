import React, { useState } from 'react';
import GameLayout from '../../app/components/layouts/GameLayout';
import Playboard from '../../app/components/templates/Playboard';
import Room from '../../app/components/templates/Room';

const RoomPage = () => {
  const [isGameStarted, setIsGameStarted] = useState(true);

  return <GameLayout>{isGameStarted ? <Playboard /> : <Room />}</GameLayout>;
};

export default RoomPage;
