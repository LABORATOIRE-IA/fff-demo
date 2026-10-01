import React from 'react';
import { AMSProvider, useAMS } from './context/AMSContext';
import { AppLayout } from './components/layout/AppLayout';
import { ConnexionView } from './components/auth/ConnexionView';
import { AuthPortalView } from './components/auth/AuthPortalView';
import { ProfilChoiceView } from './components/auth/ProfilChoiceView';
import { ConsultationChoiceView } from './components/auth/ConsultationChoiceView';
import { TeamChoiceView } from './components/auth/TeamChoiceView';
import { PlayerSearchView } from './components/players/PlayerSearchView';
import { DashboardView } from './components/dashboard/DashboardView';
import { Player360View } from './components/player360/Player360View';
import { MatchesTrainingsHubView } from './components/match/MatchesTrainingsHubView';
import { MatchDetailView } from './components/match/MatchDetailView';
import { TrainingDetailView } from './components/training/TrainingDetailView';
import { RassemblementDetailView } from './components/rassemblement/RassemblementDetailView';
import { AssistantView } from './components/assistant/AssistantView';
import { SuiviMedicalView } from './components/medical/SuiviMedicalView';
import { AIStrategyView } from './components/strategy/AIStrategyView';
import { AIStrategyWeekView } from './components/strategy/AIStrategyWeekView';
import { AIStrategyMbappeView } from './components/strategy/AIStrategyMbappeView';
import { AIStrategyRefereeStrategyView } from './components/strategy/AIStrategyRefereeStrategyView';
import { AIStrategyRefereeDebriefView } from './components/strategy/AIStrategyRefereeDebriefView';
import { AIStrategyMedicalMatchView } from './components/strategy/AIStrategyMedicalMatchView';
import { AIStrategyMedicalAgendaView } from './components/strategy/AIStrategyMedicalAgendaView';
import { AIStrategyMedicalMbappeView } from './components/strategy/AIStrategyMedicalMbappeView';
import { AIStrategyTeamManagerTodoView } from './components/strategy/AIStrategyTeamManagerTodoView';
import { AIStrategyTeamManagerOverviewView } from './components/strategy/AIStrategyTeamManagerOverviewView';
import { HomeGoalsPortalView } from './components/home/HomeGoalsPortalView';
import { ObjectiveStrategyResponseView } from './components/strategy/ObjectiveStrategyResponseView';
import { isDashboardOnlyRole } from './data/objectiveAccess';

const MainViewRouter: React.FC = () => {
  const { activeView, navigateTo, selectedObjective, setSelectedObjective, userRole } = useAMS();

  if (
    isDashboardOnlyRole(userRole) &&
    (activeView === 'accueil_objectifs' || activeView === 'objective_focused' || activeView.startsWith('ai_strategy'))
  ) {
    return <DashboardView />;
  }

  switch (activeView) {
    case 'auth_portal':
      return <AuthPortalView />;
    case 'connexion':
      return <ConnexionView />;
    case 'profil_choice':
      return <ProfilChoiceView />;
    case 'accueil_objectifs':
      return (
        <HomeGoalsPortalView
          onSelectObjective={(obj) => {
            setSelectedObjective(obj);
            navigateTo('ai_strategy');
          }}
        />
      );
    case 'objective_focused':
    case 'ai_strategy':
      return <ObjectiveStrategyResponseView />;
    case 'consultation_choice':
    case 'team_choice':
      return <TeamChoiceView />;
    case 'player_search':
      return <PlayerSearchView />;
    case 'dashboard':
      return <DashboardView />;
    case 'joueur_360':
      return <Player360View />;
    case 'suivi_medical':
      return <SuiviMedicalView />;
    case 'matchs_entrainements':
      return <MatchesTrainingsHubView />;
    case 'detail_match':
      return <MatchDetailView />;
    case 'detail_training':
      return <TrainingDetailView />;
    case 'detail_rassemblement':
      return <RassemblementDetailView />;
    case 'ai_strategy_week':
      return <AIStrategyWeekView />;
    case 'ai_strategy_player_plan':
      return <AIStrategyMbappeView />;
    case 'ai_strategy_referee_prep':
      return <AIStrategyRefereeStrategyView />;
    case 'ai_strategy_referee_debrief':
      return <AIStrategyRefereeDebriefView />;
    case 'ai_strategy_medical_match':
      return <AIStrategyMedicalMatchView />;
    case 'ai_strategy_medical_agenda':
      return <AIStrategyMedicalAgendaView />;
    case 'ai_strategy_medical_mbappe':
      return <AIStrategyMedicalMbappeView />;
    case 'ai_strategy_team_manager_todo':
      return <AIStrategyTeamManagerTodoView />;
    case 'ai_strategy_team_manager_overview':
      return <AIStrategyTeamManagerOverviewView />;
    case 'assistant':
      return <AssistantView />;
    default:
      return <DashboardView />;
  }
};

export default function App() {
  return (
    <AMSProvider>
      <AppLayout>
        <MainViewRouter />
      </AppLayout>
    </AMSProvider>
  );
}
