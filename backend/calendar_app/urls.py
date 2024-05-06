from .views import (
    CalendarMethod,
    EventMethod,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("calendar", CalendarMethod, basename="calendar")
router.register("event", EventMethod, basename="event")
urlpatterns = router.urls

# urlpatterns = [
#     path("hello/", views.hello_world, name="hello-world"),
#     path("login/", views.login_view, name="api_login"),
#     path("logout/", views.logout_view, name="api_logout"),
#     path("session/", views.session_view, name="api_session"),
#     path("whoami/", views.whoami_view, name="api_whoami"),
# ]
