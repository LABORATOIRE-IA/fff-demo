import React, { useEffect, useState } from 'react';
import { PLAYER_HEADSHOTS } from '../../data/playerHeadshotsData';

interface PlayerHeadshotProps {
  name: string;
  fallbackUrl?: string;
  className?: string;
}

export const PlayerHeadshot: React.FC<PlayerHeadshotProps> = ({ name, fallbackUrl, className = 'w-10 h-10 rounded-lg' }) => {
  const [failed, setFailed] = useState(false);
  const source = PLAYER_HEADSHOTS[name] || (fallbackUrl === '/assets/player_avatar_mbappe.jpg' && name !== 'Kylian Mbappé' ? undefined : fallbackUrl);

  useEffect(() => setFailed(false), [source]);

  if (!source || failed) {
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    return <span role="img" aria-label={name} className={`${className} inline-flex shrink-0 items-center justify-center bg-blue-50 text-blue-900 font-bold text-xs`}>{initials}</span>;
  }

  return <img src={source} alt={name} onError={() => setFailed(true)} className={`${className} shrink-0 object-cover object-top`} />;
};