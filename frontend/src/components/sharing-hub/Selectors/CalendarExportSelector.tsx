import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import { ExportOption } from '../../../@types/Calendar';
import useFetch from '../../../hooks/useFetch';

import useAuth from '../../../hooks/useAuth';
import Button from '../../ui/Button/Button';
import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: string;
  value?: string | null;
  onChange?: (calendarId: string) => void;
  exportOptions: ExportOption[];
  [x: string]: any;
}

const CalendarExportSelector = ({
  initialValue,
  onChange,
  exportOptions,
  ...rest
}: Props) => {
  const { t } = useTranslation(['calendars']);
  const { user_id } = useAuth();

  const [selectedCalendar, setSelectedCalendar] = useState<number | null>(
    initialValue
      ? parseInt(initialValue, 10)
      : exportOptions.length > 0
        ? exportOptions[0].calendar.id || null
        : null
  );

  const [data, setData] = useState<any[]>([]);
  const { fetchData: getEventsByCalendarId } = useFetch('GET', [
    'events',
    'calendar',
    selectedCalendar?.toString() || '',
  ]);

  useEffect(() => {
    if (selectedCalendar !== null && onChange) {
      onChange(selectedCalendar.toString());
    }
  }, [selectedCalendar, onChange]);

  const handleCalendarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const calendarId = parseInt(e.target.value, 10);
    setSelectedCalendar(calendarId);
  };

  const exportToExcel = async () => {
    try {
      const response = await getEventsByCalendarId();
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('No events to export');
        }
        setData(data);

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        saveAs(blob, `Calendar${selectedCalendar?.toString()}.xlsx`);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  return (
    <div>
      <Select
        type="select"
        value={
          initialValue ||
          (exportOptions.length > 0
            ? exportOptions[0].calendar.id?.toString()
            : undefined)
        }
        onChange={handleCalendarChange}
        options={exportOptions.map((option) => ({
          title: option.calendar.title,
          value: option.calendar.id?.toString() || '',
          selected:
            selectedCalendar !== null &&
            option.calendar.id === selectedCalendar,
        }))}
        {...rest}
      />

      <Button onClick={exportToExcel} className="btn--primary m-3">
        {t('calendar:sharing-hub.export')}
      </Button>
    </div>
  );
};

export default CalendarExportSelector;
