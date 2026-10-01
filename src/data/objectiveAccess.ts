import { UserRole } from '../types/ams';

export const DASHBOARD_ONLY_ROLES: UserRole[] = ['performance', 'team_manager', 'direction'];

export const isDashboardOnlyRole = (role: UserRole): boolean => DASHBOARD_ONLY_ROLES.includes(role);

export const isExampleRole = (role: UserRole): boolean => DASHBOARD_ONLY_ROLES.includes(role);

export const isStrategyObjectiveClickable = (role: UserRole, objectiveId: string): boolean => {
  if (role === 'arbitrage') return objectiveId === 'dta_obj_1';
  if (role === 'medical') return objectiveId === 'med_obj_3';
  if (role === 'entraineur') return objectiveId === 'coach_obj_1';
  return true;
};
