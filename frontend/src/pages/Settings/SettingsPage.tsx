import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useFetch from '../../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import useAuth from '../../hooks/useAuth';
import Validators from '../../utils/Validators';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import ActivityNotificationSelector from '../../components/settings/notifications/ActivityNotificationsSelector';
import { useContext } from 'react';
import { SettingsContext } from '../../store/SettingsContext';
import useSetTitle from '../../hooks/setTitle';
import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:title'));
  const {
    language,
    setLanguage,
    time_zone,
    setTimezone,
    time_format,
    setTimeFormat,
    theme,
    setTheme,
    week_start_day,
    setWeekStartsOn,
    weekend_visibility,
    setWeekendVisibility,
    event_reminder,
    setEventReminderEnabled,
    activity_notifications,
    setActivityNotificationEnabled,
  } = useContext(SettingsContext);

  const auth = useAuth();
  const { fetchData: updateDeviceSettings, loading: isLoading } = useFetch(
    'PUT',
    ['user_settings', auth.user_id]
  );

  const handleSaveSettings = async (values) => {
    console.log('Form values:', values); // Debugging
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
        // Update context with new values
        setLanguage(values.language);
        setTimezone(values.time_zone);
        setTimeFormat(values.time_format);
        setTheme(values.theme);
        setWeekStartsOn(values.week_start_day);
        setWeekendVisibility(values.weekend_visibility);
        setEventReminderEnabled(values.event_reminder);
        setActivityNotificationEnabled(values.activity_notifications);

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
          language,
          time_zone,
          time_format,
          theme,
          week_start_day,
          weekend_visibility,
          event_reminder,
          activity_notifications,
        }}
        render={({ handleSubmit }) => (
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
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Row>

            <Row className="settings-block">
              <Heading level={2} isUnderlined>
                {t('settings:notifications.title')}
              </Heading>
              <Field name="event_reminder" type="checkbox">
                {({ input }) => (
                  <EventReminderSelector>
                    <div className="form-check switch">
                      <label className="switch-label">
                        <input
                          id="switch"
                          type="checkbox"
                          className="form-check-input"
                          {...input}
                        />
                        <div className="switch-slider"></div>
                      </label>
                    </div>
                  </EventReminderSelector>
                )}
              </Field>
              <Field name="activity_notifications" type="checkbox">
                {({ input }) => (
                  <ActivityNotificationSelector>
                    <div className="form-check switch">
                      <label className="switch-label">
                        <input
                          id="switch"
                          type="checkbox"
                          className="form-check-input"
                          {...input}
                        />
                        <div className="switch-slider"></div>
                      </label>
                    </div>
                  </ActivityNotificationSelector>
                )}
              </Field>
            </Row>

            <Row className="settings-block">
              <Heading level={2} isUnderlined>
                {t('settings:general.title')}
              </Heading>
              <Field name="week_start_day" validate={Validators.required()}>
                {({ input, meta }) => (
                  <WeekStartsOnSelector
                    {...input}
                    meta={meta}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>

              <Field name="weekend_visibility">
                {({ input, meta }) => (
                  <WeekendVisbilityOnSelector
                    {...input}
                    meta={meta}
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
