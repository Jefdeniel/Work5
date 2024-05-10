# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.calendar_views import CalendarViewSet
from .views.event_views import EventViewSet
from .views.label_views import LabelViewSet
from .views.notification_views import NotificationViewSet
from .views.reminder_views import ReminderViewSet
from .views.settings_views import UserSettingsViewSet
from .views.user_views import CustomUserViewSet
from .views.auth_views import CustomAuthToken, logout_view

router = DefaultRouter()
router.register(r"users", CustomUserViewSet)
router.register(r"calendars", CalendarViewSet)
router.register(r"events", EventViewSet)
router.register(r"labels", LabelViewSet)
router.register(r"notifications", NotificationViewSet)
router.register(r"reminders", ReminderViewSet)
router.register(r"user_settings", UserSettingsViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("logout/", logout_view),
]
