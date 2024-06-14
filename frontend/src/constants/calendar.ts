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

export const getDateFormats = (time_format) => ({
  // Short time format
  LT: time_format === '24h' ? 'HH:mm' : 'h A',
  // Long time format with seconds
  LTS: time_format === '24h' ? 'HH:mm:ss' : 'h:mm:ss A',
  // Short date format
  L: 'YYYY-MM-DD',
  // Long date format
  LL: 'MMMM D, YYYY',
  //  Long date and time format
  LLL: 'MMMM D, YYYY HH:mm',
  // Full date and time format with day of the week
  LLLL: 'dddd, MMMM D, YYYY HH:mm',
});

export const getCustomFormats = (time_format) => ({
  timeGutterFormat: time_format === '24h' ? 'HH:mm' : 'h A',
  dayTimeFormat: time_format === '24h' ? 'HH:mm' : 'h A',
  weekTimeFormat: time_format === '24h' ? 'HH:mm' : 'h A',
  agendaTimeFormat: time_format === '24h' ? 'HH:mm' : 'h A',
  eventTimeRangeFormat: ({ start, end }, culture: string, localizer) =>
    localizer.format(start, 'HH:mm', culture) +
    ' - ' +
    localizer.format(end, 'HH:mm', culture),
});
