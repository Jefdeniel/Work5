import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import { CHANGE_OPTIONS_ITEMS, CONNECT_ITEMS } from '../constants/profile';
import useSetTitle from '../hooks/setTitle';
import ProfilePageHeader from '../components/settings/account/profile/ProfilePageHeader';

const ProfilePage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:profile.title'));

  return (
    <>
      <ProfilePageHeader />
      <Row>
        <Col>
          <Heading level={1} className="clr-primary mb-small">
            {t('calendar:profile.title')}
          </Heading>
          <p className="mb-large">{t('calendar:profile.description')}</p>
        </Col>
      </Row>

      <Row className="mb-large">
        <Heading level={3}>{t('calendar:profile.changeOptions')}</Heading>
        <ActionButtonList
          items={CHANGE_OPTIONS_ITEMS}
          className="btn--primary"
        />
      </Row>

      <Row className="mb-large">
        <Col>
          <Heading level={3}>{t('calendar:profile.agendas')}</Heading>
        </Col>
      </Row>

      <Row>
        <Heading level={3}>{t('calendar:profile.connectAccounts')}</Heading>
        <ActionButtonList
          items={CONNECT_ITEMS}
          className="btn--bordered-primary"
        />
      </Row>
    </>
  );
};

export default ProfilePage;
