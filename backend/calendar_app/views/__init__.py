from .calendar_views import CalendarViewSet
from .event_views import EventViewSet
from .label_views import LabelViewSet
from .notification_views import NotificationViewSet
from .reminder_views import ReminderViewSet
from .settings_views import UserSettingsViewSet
from .user_views import CustomUserViewSet

default_app_config = "calendar_app.apps.CalendarConfig"
