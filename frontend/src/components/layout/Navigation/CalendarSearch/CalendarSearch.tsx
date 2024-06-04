import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../../ui/Input/Input';

const CalendarSearch = () => {
  const { t } = useTranslation(['general']);
  const [search, setSearch] = useState('');

  const searchPlaceholder = t('general:navigation.search');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Input
      className={`mb-0`}
      isSearch
      type="search"
      placeholder={searchPlaceholder}
    />
  );
};

export default CalendarSearch;
