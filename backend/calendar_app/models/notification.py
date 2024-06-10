from django.db import models
from .custom_user import CustomUser
from .calendar import Calendar


class Notification(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        CustomUser, related_name="notifications", on_delete=models.CASCADE, null=False
    )
    calendar = models.ForeignKey(
        Calendar, related_name="notifications", on_delete=models.CASCADE, null=False
    )
    date_start = models.DateTimeField()
    date_stop = models.DateTimeField()
    is_new = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "notifications"
        db_table_comment = "Stores information about the notifications."
