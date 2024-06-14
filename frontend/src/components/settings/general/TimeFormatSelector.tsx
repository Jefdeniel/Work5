import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';

import Select from '../../ui/Select/Select';

interface TimeFormatSelectorProps {
  initialValue?: string;
  value?: string;
  onChange: (timeFormat: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    value: '12h',
    title: 'settings:general.12Hour',
  },
  {
    value: '24h',
    title: 'settings:general.24Hour',
  },
];

const TimeFormatSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: TimeFormatSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  const handleTimeFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Row className="full-select d-flex flex-row align-items-center gap-2">
        <Col>
          <span className="title">{t('settings:general.timeFormat')}</span>

          <small className="description p-0">
            {t('settings:general.timeFormatDescription')}
          </small>
        </Col>

        <Col className="d-flex flex-col justify-content-end p-0">
          <Select
            defaultValue={initialValue}
            value={value}
            onChange={handleTimeFormatChange}
            options={translatedOptions}
            meta={meta}
            {...rest}
          />
        </Col>
      </Row>
    </>
  );
};

export default TimeFormatSelector;
