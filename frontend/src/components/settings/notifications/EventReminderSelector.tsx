import Switch from '../../ui/Switch/Switch';

interface Props {
  eventReminderEnabled: boolean;
  onChange: (value: boolean) => void;
}

const EventReminderSelector = ({ eventReminderEnabled, onChange }: Props) => {
  const handleEventReminderChange = (value: boolean) => {
    onChange(value);
    console.log('Event reminder enabled:', value);
  };

  return (
    <Switch
      title="Event Reminder"
      description="Enable event reminders"
      checked={eventReminderEnabled}
      onChange={handleEventReminderChange}
    />
  );
};

export default EventReminderSelector;
