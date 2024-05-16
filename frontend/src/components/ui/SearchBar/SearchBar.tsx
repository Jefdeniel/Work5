import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Search.scss';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation(['general']);
  let searchValue = t('general:navigation.search');

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        placeholder={searchValue}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
