import type { IEventWithCoordinates } from '@shared/lib';

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  onEventDetailsClick?: (eventId: string) => void;
}

export interface PopupPosition {
  x: number;
  y: number;
}

export interface EventPopupProps {
  event: IEventWithCoordinates;
  onClose: () => void;
  onDetailsClick: (eventId: string) => void;
}
