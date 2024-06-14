from .calendar_views import CalendarViewSet
from .event_views import EventViewSet
from .notification_views import NotificationViewSet
from .reminder_views import ReminderViewSet
from .user_views import CustomUserViewSet
from .user_settings_views import UserSettingsViewSet
from .category_views import CategoryViewSet
from .calendar_users_views import CalendarUsersViewSet
from .calendar_users_views import CalendarUserByUserId
from .timeblock_views import TimeBlockViewSet
from .prompt_views import PromptInspirationViewSet


default_app_config = "calendar_app.apps.CalendarConfig"
