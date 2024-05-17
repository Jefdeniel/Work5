from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.urls import path, re_path, include
from django.contrib import admin
from calendar_app.views.user_views import SignUpView

schema_view = get_schema_view(
    openapi.Info(
        title="Sample API",
        default_version="v1",
        description="Authenticate with 'Bearer <token>' in the Authorization header after obtaining a token from /api-token-auth/.",
        terms_of_service="https://www.yoursite.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
    path(
        "api/", include("calendar_app.urls")
    ),  # Ensure this line includes the calendar_app urls
    path("signup/", SignUpView.as_view(), name="signup"),  # Ensure this line is present
]
