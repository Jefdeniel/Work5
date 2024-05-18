from drf_yasg.views import get_schema_view
from django.urls import path, re_path, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    path("api/calendar_app/", include("calendar_app.urls")),
    path(
        "swagger/",
        get_schema_view().with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        "redoc/",
        get_schema_view().with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    path(
        "api/", include("calendar_app.urls")
    ),  # Ensure this line includes the calendar_app urls
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
