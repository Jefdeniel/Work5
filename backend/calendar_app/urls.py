from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.user_views import CustomUserViewSet
from .views.calendar_views import CalendarViewSet
from .views.event_views import EventViewSet
from .views.reminder_views import ReminderViewSet
from .views.label_views import LabelViewSet
from .views.notification_views import NotificationViewSet
from .views.settings_views import UserSettingsViewSet

router = DefaultRouter()
router.register(r"users", CustomUserViewSet)
router.register(r"calendars", CalendarViewSet)
router.register(r"events", EventViewSet)
router.register(r"reminders", ReminderViewSet)
router.register(r"labels", LabelViewSet)
router.register(r"notifications", NotificationViewSet)
router.register(r"user_settings", UserSettingsViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

# urlpatterns = [
#     path("hello/", views.hello_world, name="hello-world"),
#     path("login/", views.login_view, name="api_login"),
#     path("logout/", views.logout_view, name="api_logout"),
#     path("session/", views.session_view, name="api_session"),
#     path("whoami/", views.whoami_view, name="api_whoami"),
# ]
