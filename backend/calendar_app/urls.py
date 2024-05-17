from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.calendar_views import CalendarViewSet
from .views.event_views import EventViewSet
from .views.label_views import LabelViewSet
from .views.notification_views import NotificationViewSet
from .views.reminder_views import ReminderViewSet
from .views.settings_views import UserSettingsViewSet
from .views.user_views import CustomUserViewSet
from .views.user_views import SignUpView


from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_yasg.views import get_schema_view


router = DefaultRouter()
router.register(r"users", CustomUserViewSet)
router.register(r"calendars", CalendarViewSet)
router.register(r"events", EventViewSet)
router.register(r"labels", LabelViewSet)
router.register(r"notifications", NotificationViewSet)
router.register(r"reminders", ReminderViewSet)
router.register(r"user_settings", UserSettingsViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version="v1",
        description="API documentation",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path("", include(router.urls)),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r"^.*", TemplateView.as_view(template_name="index.html"))
]  # 404s will be handled by frontend
