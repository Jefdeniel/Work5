import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFetch from '../../../hooks/useFetch';

import Button from '../../ui/Button/Button';
import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: string;
  value?: string | null;
  onChange?: (calendarId: string) => void;
  exportOptions: number[];
  [x: string]: any;
}

const CalendarExportSelector = ({
  initialValue,
  value,
  onChange,
  exportOptions,
  ...rest
}: Props) => {
  const { t } = useTranslation(['calendars']);

  const [selectedCalendar, setSelectedCalendar] = useState(
    initialValue || exportOptions[0] || null
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
    console.log('calendarId', calendarId);
  };

  const translatedOptions = exportOptions.map((option) => ({
    title: t(`calendars:${option}`),
    value: option,
    selected: option === selectedCalendar,
  }));

  const exportToExcel = async () => {
    try {
      const response = await getEventsByCalendarId();
      console.log('response', response);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log('data', data);

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

        saveAs(blob, 'Calendar' + selectedCalendar + '.xlsx');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Select
        type="select"
        defaultValue={initialValue || exportOptions[0]}
        onChange={handleCalendarChange}
        options={translatedOptions}
        {...rest}
      />
      <Button onClick={exportToExcel} className="btn--primary">
        {t('calendar:sharing-hub.export')}
      </Button>
    </div>
  );
};

export default CalendarExportSelector;
