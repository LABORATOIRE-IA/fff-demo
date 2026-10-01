export type DataScope =
  | 'all'
  | 'dashboard'
  | 'players'
  | 'player_360'
  | 'match'
  | 'training'
  | 'medical'
  | 'rassemblement';

export type ExportFormat = 'pdf' | 'csv' | 'json' | 'fiche_staff';

export interface DataSourceConnector {
  id: string;
  name: string;
  category: 'gps' | 'tracking' | 'video' | 'medical' | 'clubs' | 'biomeca';
  provider: string;
  logoText: string;
  color: string;
  status: 'connected' | 'syncing' | 'error' | 'idle';
  lastSync: string;
  frequency: string;
  latencyMs: number;
  recordsCount: number;
  description: string;
  supportedTypes: string[];
}

export interface ImportPreviewRow {
  id: string;
  athlete: string;
  number: string;
  club: string;
  metric1: string;
  metric2: string;
  metric3: string;
  metric4: string;
  status: 'valid' | 'warning' | 'error';
}
