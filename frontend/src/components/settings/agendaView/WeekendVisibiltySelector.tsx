import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';

import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: boolean;
  value?: boolean;
  onChange: (value: boolean) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:calendarView.show',
    value: true,
  },
  {
    title: 'settings:calendarView.dontShow',
    value: false,
  },
];

const WeekendVisbilityOnSelector = ({
  initialValue,
  value = false,
  onChange,
  meta,
  ...rest
}: Props) => {
  const { t } = useTranslation(['settings']);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value === 'true');
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value.toString(),
    selected: option.value.toString() === value.toString(),
  }));

  return (
    <>
      <Row className="full-select d-flex flex-row align-items-center gap-2">
        <Col>
          <span className="title">
            {t('settings:calendarView.weekendVisibilityToggle')}
          </span>

          <small className="description p-0">
            {t('settings:calendarView.weekendVisibilityToggleDescription')}
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

export default WeekendVisbilityOnSelector;
