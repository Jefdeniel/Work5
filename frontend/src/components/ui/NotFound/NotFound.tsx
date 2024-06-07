import { useTranslation } from 'react-i18next';
import useSetTitle from '../../../hooks/setTitle';
import { Row } from 'react-bootstrap';
import Heading from '../Heading/Heading';
import { GoBackIcon, InspirationIcon } from '../Icon/SvgIcons';

const NotFound = () => {
  const { t } = useTranslation(['general']);
  useSetTitle(t('general:notFound.title'));

  return (
    <div
      className={`px-5 height-80 d-flex flex-column justify-content-between`}
    >
      <Row className={`w-75`}>
        <Heading level={1} className="heading--lg clr-primary mb-small" />
        <p className={`mb-large`}>{t('general:notFound.description')}</p>
      </Row>

      <div
        className={`h-100 d-flex justify-content-center align-items-center flex-column`}
      >
        <GoBackIcon
          isBig
          className={`mb-xlarge`}
          onClick={() => history.back()}
        />

        <span className={`heading heading--lg clr-primary-300 mt-4`}>
          {t('general:notFound.goBack')}
        </span>
      </div>
    </div>
  );
};

export default NotFound;
