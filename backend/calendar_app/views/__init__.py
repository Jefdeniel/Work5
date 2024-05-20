from .calendar_views import CalendarViewSet
from .event_views import EventViewSet
from .label_views import LabelViewSet
from .notification_views import NotificationViewSet
from .reminder_views import ReminderViewSet
from .user_views import CustomUserViewSet
from .user_settings_views import UserSettingsViewSet

default_app_config = "calendar_app.apps.CalendarConfig"
