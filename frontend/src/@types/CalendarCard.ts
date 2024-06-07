export interface CalendarCardProps {
  img: string;
  name: string;
  userAvatars?: string[];
  link?: string;
  onDelete: () => void;
  onEdit: () => void;
}
