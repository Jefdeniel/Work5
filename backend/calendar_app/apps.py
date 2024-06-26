from django.apps import AppConfig


class CalendarConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "calendar_app"
    verbose_name = "calendar"

    def ready(self):
        import calendar_app.signals
