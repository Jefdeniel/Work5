import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/setTitle';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { useSettings } from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
import Validators from '../../utils/Validators';

import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';
import ActivityNotification from '../../components/settings/notifications/ActivityNotificationsSelector';
import { useContext } from 'react';
import { SettingsContext } from '../../store/SettingsContext';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:title'));
  const settings = useContext(SettingsContext);

  const auth = useAuth();
  const { fetchData: updateDeviceSettings, loading: isLoading } = useFetch(
    'PUT',
    ['user_settings', auth.user_id]
  );

  const handleSaveSettings = async (values) => {
    try {
      const response = await updateDeviceSettings(
        {},
        {
          user: auth.user_id,
          language: values.language,
          time_zone: values.time_zone,
          time_format: values.time_format,
          theme: values.theme,
          event_reminder: values.event_reminder,
          activity_notifications: values.activity_notifications,
          week_start_day: values.week_start_day,
          weekend_visibility: values.weekend_visibility,
        }
      );

      if (response.ok) {
        toast.success(t('settings:saved'));
      } else {
        toast.error(t('settings:failed'));
        throw new Error('Failed to save settings' + response.statusText);
      }
    } catch (error) {
      toast.error(t('settings:failed'));
      console.error(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSaveSettings}
        initialValues={{
          language: settings.language,
          time_zone: settings.time_zone,
          time_format: settings.time_format,
          theme: settings.theme,
          week_start_day: settings.week_start_day,
          weekend_visibility: settings.weekend_visibility,
          event_reminder: settings.event_reminder,
          activity_notifications: settings.activity_notifications,
        }}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <Row className="settings-block">
              <Heading level={2} isUnderlined>
                {t('settings:general.title')}
              </Heading>
              <Field name="language" validate={Validators.compose()}>
                {({ input, meta }) => (
                  <LanguageSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.language}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="time_zone" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeZoneSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.time_zone}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="time_format" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeFormatSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.time_format}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="theme" validate={Validators.required()}>
                {({ input, meta }) => (
                  <ThemeSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.theme}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Row>

            <Button className="btn--success" type="submit" disabled={isLoading}>
              {t('settings:save')}
            </Button>
          </form>
        )}
      />
    </>
  );
};

export default SettingsPage;
