import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';

import { AVAILABLE_LANGUAGES } from '../../../i18n';
import Select from '../../ui/Select/Select';

interface LanguageSelectorProps {
  changeLanguage?: boolean;
  initialValue?: string;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (language: string) => void;
  [key: string]: any;
}

const LanguageSelector = ({
  changeLanguage,
  initialValue,
  value,
  meta,
  onChange,
  ...rest
}: LanguageSelectorProps) => {
  const { t } = useTranslation(['settings']);
  const { i18n } = useTranslation();

  const onLanguageSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = e.target.value;

    if (selectedLanguage) {
      void (changeLanguage && i18n.changeLanguage(selectedLanguage));
      onChange && onChange(selectedLanguage);
    }
  };

  const options = AVAILABLE_LANGUAGES.map((language) => ({
    title: language.name,
    value: language.value,
    selected: value === language.value,
  }));

  return (
    <Row className="full-select d-flex flex-row align-items-center">
      <Col className="mb-2">
        <span className="title">{t('settings:general.language')}</span>

        <small className="description p-0">
          {t('settings:general.languageDescription')}
        </small>
      </Col>

      <Col className="d-flex flex-col justify-content-end p-0">
        <Select
          defaultValue={initialValue}
          value={value}
          onChange={onLanguageSelectionChange}
          options={options}
          meta={meta}
          {...rest}
        />
      </Col>
    </Row>
  );
};

export default LanguageSelector;
