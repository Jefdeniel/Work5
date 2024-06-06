from django.db import models
from .custom_user import CustomUser
from .calendar import Calendar


class CalendarUser(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="calendar_users"
    )
    calendar = models.ForeignKey(
        Calendar, on_delete=models.CASCADE, related_name="calendar_users"
    )
    role = models.CharField(
        max_length=50,
        choices=[("ADMIN", "Admin"), ("EDITOR", "Editor"), ("VIEWER", "Viewer")],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "calendar_users"
        verbose_name_plural = "Calendar Users"
        unique_together = ("user", "calendar")
        db_table_comment = "Stores information about users assigned to calendars."
