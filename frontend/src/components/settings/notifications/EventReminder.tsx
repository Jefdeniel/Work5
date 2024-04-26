import Switch from '../../ui/Switch/Switch';

interface Props {
  eventReminderEnabled: boolean;
  onChange: (value: boolean) => void;
}

const EventReminder = ({ eventReminderEnabled, onChange }: Props) => {
  const handleSwitchChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <Switch
      title="Event Reminder"
      description="Enable event reminders"
      checked={eventReminderEnabled}
      onChange={handleSwitchChange}
    />
  );
};

export default EventReminder;
