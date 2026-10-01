import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { PlayerPreviewDrawer } from '../modals/PlayerPreviewDrawer';
import { MedicalSensitiveModal } from '../modals/MedicalSensitiveModal';
import { DataImportModal } from '../modals/DataImportModal';
import { DataExportModal } from '../modals/DataExportModal';
import { DataSourcesHubModal } from '../modals/DataSourcesHubModal';
import { FloatingAssistantWidget } from '../assistant/FloatingAssistantWidget';
import { CollaborativeCommentsDrawer } from '../comments/CollaborativeCommentsDrawer';
import { PlayerDetectionHistoryModal } from '../player360/PlayerDetectionHistoryModal';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeView,
    syncToastMessage,
    isSyncingAll,
    isCommentsDrawerOpen,
    closeCommentsDrawer,
    commentsDrawerTarget,
    isDetectionModalOpen,
    closeDetectionModal,
    selectedPlayer
  } = useAMS();

  const isAuthFlow =
    activeView === 'auth_portal' ||
    activeView === 'connexion' ||
    activeView === 'profil_choice' ||
    activeView === 'consultation_choice' ||
    activeView === 'team_choice';

  if (isAuthFlow) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  const isPlayerView = activeView === 'joueur_360';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar (handles both full and icon-only collapsed states) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main
          className={`flex-1 ${
            isPlayerView ? 'p-3 sm:p-5 max-w-[1720px] w-full mx-auto' : 'p-6 max-w-7xl w-full mx-auto'
          }`}
        >
          {children}
        </main>
      </div>

      {/* Global Interactive Drawers & Modals */}
      <PlayerPreviewDrawer />
      <MedicalSensitiveModal />
      <DataImportModal />
      <DataExportModal />
      <DataSourcesHubModal />

      {/* Global Collaborative Comments Drawer (PowerPoint style) */}
      <CollaborativeCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={closeCommentsDrawer}
        defaultTargetId={commentsDrawerTarget?.targetId}
        defaultTargetType={commentsDrawerTarget?.targetType}
        defaultTargetTitle={commentsDrawerTarget?.targetTitle}
      />

      {/* Player Detection & Career History Modal */}
      {selectedPlayer && (
        <PlayerDetectionHistoryModal
          player={selectedPlayer}
          isOpen={isDetectionModalOpen}
          onClose={closeDetectionModal}
        />
      )}

      {/* Floating Chatbot Assistant Shortcut (Bottom Right) */}
      <FloatingAssistantWidget />

      {/* Live Sync Toast Banner */}
      {syncToastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-bold">
            {isSyncingAll ? (
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{syncToastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

