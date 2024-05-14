import { useTranslation } from 'react-i18next';
import useSetTitle from '../hooks/setTitle';
import { Row } from 'react-bootstrap';
import Heading from '../components/ui/Heading/Heading';
import Button from '../components/ui/Button/Button';
import Icon from '../components/ui/Icon/Icon';

const SharingHubPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:sharing-hub.title'));

  return (
    <>
      <Row>
        <Heading level={1} className="clr-primary mb-small">
          {t('calendar:sharing-hub.title')}
        </Heading>
        <p className="mb-large">{t('calendar:sharing-hub.description')}</p>
      </Row>

      <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            {/* To change */}
            <Icon src="/icons/user-profile.svg" alt="User avatar icon" />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="invite"
              icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
            />
          </li>
        </ul>
      </Row>

      <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.exportAgendaAs')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            <Button className={`btn--primary`} text="PDF" />
          </li>

          <li>
            <Button className={`btn--primary`} text="Excel sheet" />
          </li>
        </ul>
      </Row>

      <Row>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.integrateExternal')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            <Button
              className={`btn--primary`}
              text="Slack"
              icon={<Icon src="/icons/slack.svg" alt="Slack logo" />}
            />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="Microsoft Teams"
              icon={<Icon src="/icons/teams.svg" alt="Microsoft Teams logo" />}
            />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="Apple Agenda"
              icon={<Icon src="/icons/apple.svg" alt="Apple Agenda logo" />}
            />
          </li>
        </ul>
      </Row>
    </>
  );
};

export default SharingHubPage;
