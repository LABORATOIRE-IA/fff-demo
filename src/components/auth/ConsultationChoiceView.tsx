import React from 'react';
import { TeamChoiceView } from './TeamChoiceView';

// Re-exports TeamChoiceView to satisfy flow requirements:
// Connexion -> Profil -> Sélection Équipe -> Dashboard
export const ConsultationChoiceView: React.FC = () => {
  return <TeamChoiceView />;
};
