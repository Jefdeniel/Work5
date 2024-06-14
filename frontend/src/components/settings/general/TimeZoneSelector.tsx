import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ITimezoneOption, allTimezones } from 'react-timezone-select';
import { Col, Row } from 'react-bootstrap';

import Select from '../../ui/Select/Select';

import './Selector.scss';

interface TimeZoneSelectorProps {
  initialValue?: string | ITimezoneOption;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (timezone: string) => void;
  [key: string]: any;
}

const TimeZoneSelector = ({
  initialValue,
  value,
  meta,
  onChange,
  ...rest
}: TimeZoneSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const onTimeZoneSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTimeZone = e.target.value;
    onChange && onChange(selectedTimeZone);
  };

  const options = Object.keys(allTimezones).map((timezone) => ({
    title: timezone.replace(/_/g, ' '),
    value: timezone,
  }));

  return (
    <>
      <Row className="full-select d-flex flex-row align-items-center gap-2">
        <Col>
          <span className="title">{t('settings:general.timeZone')}</span>

          <small className="description">
            {t('settings:general.timeZoneDescription')}
          </small>
        </Col>

        <Col className="d-flex flex-col justify-content-end p-0">
          <Select
            value={value}
            onChange={onTimeZoneSelectionChange}
            options={options}
            meta={meta}
            {...rest}
          />
        </Col>
      </Row>
    </>
  );
};

export default TimeZoneSelector;
