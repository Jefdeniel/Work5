import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useSetTitle from '../../hooks/setTitle';
import useFetch from '../../hooks/useFetch';
import { useSettings } from '../../hooks/useSettings';

import DeleteAccount from '../../components/settings/account/DeleteAccount';
import Signout from '../../components/settings/account/Signout';
import DeleteAccountModal from '../../components/settings/account/modals/DeleteAccountModal';
import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import ActivityNotification from '../../components/settings/notifications/ActivityNotificationsSelector';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import Button from '../../components/ui/Button/Button';
import Col from '../../components/ui/Flex/Col';
import Heading from '../../components/ui/Heading/Heading';

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
      <Col>
        <Heading level={2} isUnderlined>
          {t('settings:general.title')}
        </Heading>
        <LanguageSelector
          onChange={settings.setLanguage}
          initialLanguage={settings.language}
        />
        <TimeZoneSelector
          onChange={settings.setSelectedTimezone}
          initialTimeZone={settings.selectedTimezone}
        />
        <TimeFormatSelector
          onChange={settings.setTimeFormat}
          initialTimeFormat={settings.timeFormat}
        />
        <ThemeSelector
          onChange={settings.setTheme}
          initialTheme={settings.theme}
        />
      </Col>
      <Col>
        <Heading level={2} isUnderlined>
          {t('settings:notifications.title')}
        </Heading>
        <EventReminderSelector
          eventReminderEnabled={settings.eventReminderEnabled}
          onChange={settings.setEventReminderEnabled}
        />
        <ActivityNotification
          activityNotificationEnabled={settings.activityNotificationEnabled}
          onChange={settings.setActivityNotificationEnabled}
        />
      </Col>
      <Col>
        <Heading level={2} isUnderlined>
          {t('settings:agendaView.title')}
        </Heading>
        <WeekStartsOnSelector
          onChange={settings.setWeekStartsOn}
          initialWeekStartsOn={settings.weekStartsOn}
        />
        <WeekendVisbilityOnSelector
          onChange={settings.setWeekendVisibility}
          initialWeekendVisibility={settings.weekendVisibility}
        />
      </Col>
      <Col>
        <Heading level={2} isUnderlined>
          {t('settings:account.title')}
          <Signout />
          <DeleteAccount onClick={openDeleteAccountModal} />
        </Heading>
      </Col>
      <Col justifySelf="end">
        <Button
          className="btn--primary"
          text={t('settings:save')}
          type="submit"
          onClick={handleSaveSettings}
        />
      </Col>

      {showDeleteAccountModal && (
        <DeleteAccountModal onClose={closeDeleteAccountModal} />
      )}
    </>
  );
};

export default SettingsPage;
