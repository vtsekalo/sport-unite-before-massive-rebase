import { ROUTES } from '@shared/lib';

export interface RouteConfig {
  bgcolor?: string;
  justifyContent?: string;
  pointerEvents?: string;
  backdropFilter?: string;
}

export const ROUTE_SETTINGS: Record<string, RouteConfig> = {
  [ROUTES.EVENT.DETAIL('')]: {
    bgcolor: 'transparent',
    justifyContent: 'start',
    pointerEvents: 'none',
    backdropFilter: 'none',
  },
};
