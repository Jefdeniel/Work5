import { Views } from 'react-big-calendar';

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: 'Day', key: Views.DAY },
  { id: Views.WEEK, label: 'Week', key: Views.WEEK },
  { id: Views.MONTH, label: 'Month', key: Views.MONTH },
  { id: Views.AGENDA, label: 'Agenda', key: Views.AGENDA },
];

export const translateViewOptions = (t) => {
  return VIEW_OPTIONS.map((option) => ({
    ...option,
    label: t(`calendar:calendar.views.${option.id}`),
  }));
};
