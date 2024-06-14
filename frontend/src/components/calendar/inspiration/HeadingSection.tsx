import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Heading from '../../ui/Heading/Heading';

const HeadingSection = () => {
  const { t } = useTranslation(['general', 'calendar']);

  return (
    <Row className="w-75">
      <Heading level={1} className="heading--lg clr-primary mb-small" />
      <p className="mb-large">{t('calendar:inspiration.description')}</p>
    </Row>
  );
};

export default HeadingSection;
