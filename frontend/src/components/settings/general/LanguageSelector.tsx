import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../../../i18n';
import Select from '../../ui/Select/Select';
import { Col, Row } from 'react-bootstrap';

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
    <Row className="full-select d-flex flex-row">
      <Col xs={12} className="mb-2">
        <Row>
          <span className="title">{t('settings:general.language')}</span>
          <small className="description">
            {t('settings:general.languageDescription')}
          </small>
        </Row>
      </Col>
      <Col xs={12} className="d-flex flex-col justify-content-end p-0">
        <Select
          title={t('settings:general.language')}
          description={t('settings:general.languageDescription')}
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
