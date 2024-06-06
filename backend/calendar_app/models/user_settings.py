from django.db import models
from .custom_user import CustomUser


class UserSettings(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    language = models.CharField(max_length=50)
    time_zone = models.CharField(max_length=50)
    time_format = models.CharField(max_length=50)
    theme = models.CharField(max_length=50)
    event_reminder = models.BooleanField(default=False)
    activity_notifications = models.BooleanField(default=False)
    week_start_day = models.CharField(max_length=50)
    weekend_visibility = models.BooleanField(default=False)

    class Meta:
        db_table = "user_settings"
        db_table_comment = "Stores information about the users' personal settings."
