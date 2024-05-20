import { useTranslation } from 'react-i18next';
import Switch from '../../ui/Switch/Switch';

interface Props {
  activityNotificationEnabled: boolean;
  onChange: (value: boolean) => void;
}

const ActivityNotification = ({
  activityNotificationEnabled,
  onChange,
}: Props) => {
  const { t } = useTranslation(['settings']);
  const handleActivityNotificationChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <Switch
      title={t('settings:notifications.activityNotification')}
      description={t('settings:notifications.activityNotificationDescription')}
      checked={activityNotificationEnabled}
      onChange={handleActivityNotificationChange}
    />
  );
};

export default ActivityNotification;
