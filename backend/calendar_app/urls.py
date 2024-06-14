from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views.calendar_views import CalendarViewSet
from .views.event_views import EventViewSet
from .views.category_views import CategoryViewSet
from .views.notification_views import NotificationViewSet
from .views.reminder_views import ReminderViewSet
from .views.user_settings_views import UserSettingsViewSet
from .views.user_views import CustomUserViewSet
from .views.auth_views import SignUpView
from .views.calendar_users_views import CalendarUsersViewSet
from .views.calendar_users_views import CalendarUserByUserId
from .views.timeblock_views import TimeBlockViewSet
from .views.prompt_views import PromptInspirationViewSet

from django.conf import settings


router = DefaultRouter(trailing_slash=False)
router.register(r"users", CustomUserViewSet)
router.register(r"calendars", CalendarViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"events", EventViewSet)
router.register(r"notifications", NotificationViewSet)
router.register(r"reminders", ReminderViewSet)
router.register(r"user_settings", UserSettingsViewSet)
router.register(r"calendar_users", CalendarUsersViewSet)
router.register(r"timeblocks", TimeBlockViewSet)
router.register(r"prompt", PromptInspirationViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("signup", SignUpView.as_view(), name="signup"),
    path(
        "calendar_users/user_id/<int:user_id>",
        CalendarUserByUserId.as_view(),
        name="calendar-user-by-user-id",
    ),
]
