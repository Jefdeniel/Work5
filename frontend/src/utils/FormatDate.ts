import { DateTime } from 'luxon';

export const isISODate = (date) => {
  try {
    var parsedDate = DateTime.fromISO(date);
    return parsedDate.isValid;
  } catch {
    return false;
  }
};

export const formatDate = (date, dateFormat, includeTime = false) => {
  if (!isISODate(date)) {
    return String(date);
  }

  const formatString =
    dateFormat === 'dd/MM/yyyy' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  const dateTimeFormat = includeTime ? `${formatString} HH:mm` : formatString;

  const parsedDate = DateTime.fromISO(String(date));
  return parsedDate.toFormat(dateTimeFormat);
};
