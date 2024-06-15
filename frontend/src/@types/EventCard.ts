import { Event } from './Events';

export interface EventCardProps {
  event: Event;
  color?: string;
  isGoogleEvent?: boolean;
  onDoubleClick?: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
