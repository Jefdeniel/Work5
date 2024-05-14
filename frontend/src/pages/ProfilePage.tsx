import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import { CHANGE_OPTIONS_ITEMS, CONNECT_ITEMS } from '../constants/profile';
import useSetTitle from '../hooks/setTitle';
import ProfilePageHeader from '../components/settings/account/profile/ProfilePageHeader';

const ProfilePage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:profile.title'));

  return (
    <>
      <ProfilePageHeader />
      <Row className="mb-large mt-1">
        <Heading level={1} className="clr-primary mt-large mb-large">
          {t('settings:profile.title')}
        </Heading>
      </Row>

      <Row className="mb-large mt-1">
        <Heading level={3}>{t('settings:profile.changeOptions')}</Heading>
        <ActionButtonList
          items={CHANGE_OPTIONS_ITEMS}
          className="btn--primary"
        />
      </Row>

      <Row className="mb-large mt-1">
        <Col>
          <Heading level={3}>{t('settings:profile.calendars')}</Heading>
        </Col>
      </Row>

      <Row>
        <Heading level={3}>{t('settings:profile.connectAccounts')}</Heading>
        <ActionButtonList
          items={CONNECT_ITEMS}
          className="btn--bordered-primary"
        />
      </Row>
    </>
  );
};

export default ProfilePage;
