import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { DigitalTwinCockpitView } from './DigitalTwinCockpitView';

export const Player360View: React.FC = () => {
  const { selectedPlayer } = useAMS();

  if (!selectedPlayer) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Aucun joueur sélectionné.
      </div>
    );
  }

  return <DigitalTwinCockpitView player={selectedPlayer} />;
};

export default Player360View;
