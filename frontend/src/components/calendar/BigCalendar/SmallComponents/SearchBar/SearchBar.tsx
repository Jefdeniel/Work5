import { useTranslation } from 'react-i18next';

import { Event } from '../../../../../@types/Events';

import { Col } from 'react-bootstrap';
import Input from '../../../../ui/Input/Input';

interface Props {
  className?: string;
  searchQuery: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const SearchBar = ({
  className,
  searchQuery,
  handleSearchInput,
  filteredEvents,
  handleEventClick,
}: Props) => {
  const { t } = useTranslation(['calendar']);

  return (
    <Col className={className}>
      <Input
        className="toolbar__search"
        isSearch
        placeholder={t('calendar:calendar.search')}
        type="search"
        defaultValue={searchQuery}
        onChange={handleSearchInput}
      />

      {filteredEvents.length > 0 && (
        <ul className="search-results">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="search-result-item"
              onClick={() => handleEventClick(event)}
            >
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </Col>
  );
};

export default SearchBar;
