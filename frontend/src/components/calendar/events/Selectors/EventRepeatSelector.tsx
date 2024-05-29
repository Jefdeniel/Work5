import { useTranslation } from 'react-i18next';
import Select from '../../../ui/Select/Select';
import { FieldMetaState } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';

interface SexSelectorProps {
  initialValue?: string;
  value?: string | null;
  onChange: (Sex: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

export const REPEAT_OPTIONS = [
  {
    title: 'repeatOptions.never',
    value: null,
  },
  {
    title: 'repeatOptions.daily',
    value: 'daily',
  },
  {
    title: 'repeatOptions.weekly',
    value: 'weekly',
  },
  {
    title: 'repeatOptions.monthly',
    value: 'monthly',
  },
  {
    title: 'repeatOptions.yearly',
    value: 'yearly',
  },
  {
    title: 'repeatOptions.custom',
    value: 'custom',
  },
];

const EventRepeatSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: SexSelectorProps) => {
  const { t } = useTranslation(['patients']);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const translatedOptions = REPEAT_OPTIONS.map((option) => ({
    title: t(`events:eventInfo.${option.title}`),
    value: option.value,
    selected: option.value === value,
  }));

  return (
    <>
      {/* <Row>
        <Col className="full-select d-flex flex-col justify-content-center">
          <small className="description">
            {t('settings:calendarView.weekendVisibilityToggleDescription')}
          </small>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-col justify-content-end p-0"> */}
      <Select
        title={t('patients:patientInfo.sex')}
        type="select"
        defaultValue={initialValue}
        onChange={handlePeriodChange}
        options={translatedOptions}
        meta={meta}
        {...rest}
      />
      {/* </Col>
      </Row> */}
    </>
  );
};

export default EventRepeatSelector;
