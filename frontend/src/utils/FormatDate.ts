import { DateTime } from 'luxon';

export const isISODate = (date) => {
  try {
    // This will successfully parse both complete ISO dates and ISO date-only strings
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

  // Define the base format based on the dateFormat string
  const formatString =
    dateFormat === 'dd/MM/yyyy' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  // Append time formatting if includeTime is true
  const dateTimeFormat = includeTime ? `${formatString} HH:mm` : formatString;

  const parsedDate = DateTime.fromISO(String(date));
  return parsedDate.toFormat(dateTimeFormat);
};

export const formatDateForDB = (date: string, dateFormat: string): string => {
  if (dateFormat === 'dd/MM/yyyy') {
    // Convert date from 'dd/MM/yyyy' to ISO format 'yyyy-MM-dd'
    return DateTime.fromFormat(date, 'dd/MM/yyyy').toISO();
  } else {
    // Convert date from 'MM/dd/yyyy' to ISO format 'yyyy-MM-dd'
    return DateTime.fromFormat(date, 'MM/dd/yyyy').toISO();
  }
};
