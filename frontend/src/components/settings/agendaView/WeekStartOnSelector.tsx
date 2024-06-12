import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';

import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: string;
  value?: string;
  onChange: (value: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:calendarView.monday',
    value: 'Monday',
  },
  {
    title: 'settings:calendarView.sunday',
    value: 'Sunday',
  },
];

const WeekStartsOnSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: Props) => {
  const { t } = useTranslation(['settings']);

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as string);
  };

  return (
    <>
      <Row className="full-select d-flex flex-row align-items-center gap-2">
        <Col>
          <span className="title">
            {t('settings:calendarView.weekStartPreference')}
          </span>

          <small className="description p-0">
            {t('settings:calendarView.weekStartPreferenceDescription')}
          </small>
        </Col>

        <Col className="d-flex flex-col justify-content-end p-0">
          <Select
            defaultValue={initialValue}
            value={value}
            onChange={handleChange}
            options={translatedOptions}
            meta={meta}
            {...rest}
          />
        </Col>
      </Row>
    </>
  );
};

export default WeekStartsOnSelector;
