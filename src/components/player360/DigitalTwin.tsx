import React from 'react';
import { Player } from '../../types/ams';
import { DigitalTwinCockpitView } from './DigitalTwinCockpitView';

interface DigitalTwinProps {
  player: Player;
}

export const DigitalTwin: React.FC<DigitalTwinProps> = ({ player }) => {
  return <DigitalTwinCockpitView player={player} />;
};

export default DigitalTwin;
