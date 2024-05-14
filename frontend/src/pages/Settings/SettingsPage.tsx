import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/setTitle';
import { useSettings } from '../../hooks/useSettings';

import { Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import Validators from '../../utils/Validators';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Signout from '../../components/settings/account/Signout';
import DeleteAccount from '../../components/settings/account/DeleteAccount';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import DeleteAccountModal from '../../components/settings/account/modals/DeleteAccountModal';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';
import ActivityNotification from '../../components/settings/notifications/ActivityNotificationsSelector';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:title'));
  const settings = useSettings();

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // TODO: write function in backend
  const { fetchData: updateDeviceSettings } = useFetch('POST', ['settings']);
  const handleSaveSettings = async () => {
    try {
      const response = await updateDeviceSettings(
        {},
        {
          language: settings.language,
          selectedTimezone: settings.selectedTimezone,
          timeFormat: settings.timeFormat,
          theme: settings.theme,
          eventReminderEnabled: settings.eventReminderEnabled,
          activityNotificationEnabled: settings.activityNotificationEnabled,
          weekStartsOn: settings.weekStartsOn,
          weekendVisibility: settings.weekendVisibility,
        }
      );

      if (response.ok) {
        console.log('Settings saved');
      } else {
        throw new Error('Failed to save settings' + response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // modals
  const openDeleteAccountModal = () => {
    setShowDeleteAccountModal(true);
  };

  const closeDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
  };

  return (
    <>
      <Form
        onSubmit={handleSaveSettings}
        initialValues={settings}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className={`settings-block`}>
              <Heading level={2} isUnderlined>
                {t('settings:general.title')}
              </Heading>
              <Field name="language" validate={Validators.compose()}>
                {({ input, meta }) => (
                  <LanguageSelector
                    {...input}
                    meta={meta}
                    onChange={input.onChange}
                    initialLanguage={settings.language}
                  />
                )}
              </Field>
              <Field name="selectedTimezone" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeZoneSelector
                    {...input}
                    meta={meta}
                    onChange={input.onChange}
                    initialTimeZone={settings.selectedTimezone}
                  />
                )}
              </Field>
              <Field name="timeFormat" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeFormatSelector
                    {...input}
                    meta={meta}
                    onChange={input.onChange}
                    initialTimeFormat={settings.timeFormat}
                  />
                )}
              </Field>
              <Field name="theme" validate={Validators.required()}>
                {({ input, meta }) => (
                  <ThemeSelector
                    {...input}
                    meta={meta}
                    onChange={input.onChange}
                    initialTheme={settings.theme}
                  />
                )}
              </Field>
            </Row>

            <Row className={`settings-block`}>
              <Heading level={2} isUnderlined>
                {t('settings:notifications.title')}
              </Heading>
              <Field
                name="eventReminderEnabled"
                validate={Validators.required()}
              >
                {({ input }) => (
                  <EventReminderSelector
                    {...input}
                    eventReminderEnabled={settings.eventReminderEnabled}
                    onChange={settings.setEventReminderEnabled}
                  />
                )}
              </Field>
              <Field
                name="activityNotificationEnabled"
                validate={Validators.required()}
              >
                {({ input }) => (
                  <ActivityNotification
                    {...input}
                    activityNotificationEnabled={
                      settings.activityNotificationEnabled
                    }
                    onChange={settings.setActivityNotificationEnabled}
                  />
                )}
              </Field>
            </Row>

            <Row className={`settings-block`}>
              <Heading level={2} isUnderlined className="border-bottom">
                {t('settings:calendarView.title')}
              </Heading>
              <Field name="weekStartsOn" validate={Validators.required()}>
                {({ input, meta }) => (
                  <WeekStartsOnSelector
                    {...input}
                    meta={meta}
                    onChange={settings.setWeekStartsOn}
                    initialWeekStartsOn={settings.weekStartsOn}
                  />
                )}
              </Field>
              <Field name="weekendVisibility" validate={Validators.required()}>
                {({ input, meta }) => (
                  <WeekendVisbilityOnSelector
                    {...input}
                    meta={meta}
                    onChange={settings.setWeekendVisibility}
                    initialWeekendVisibility={settings.weekendVisibility}
                  />
                )}
              </Field>
            </Row>

            <Row className={`settings-block`}>
              <Heading level={2} isUnderlined>
                {t('settings:account.title')}
              </Heading>

              <Signout className={`btn btn--danger`} />

              <DeleteAccount
                className={`btn btn--bordered-danger`}
                onClick={openDeleteAccountModal}
              />
            </Row>

            <Row className={`mt-large`}>
              <Button
                className={`btn--success`}
                text={t('settings:save')}
                type="submit"
              />
            </Row>

            {showDeleteAccountModal && (
              <DeleteAccountModal onClose={closeDeleteAccountModal} />
            )}
          </form>
        )}
      />
    </>
  );
};

export default SettingsPage;
