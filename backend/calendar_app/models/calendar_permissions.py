from django.db import models
from django.contrib.auth import get_user_model
from .calendar import Calendar


class CalendarPermissions(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    can_view_event_details = models.BooleanField(default=False)
    can_create_events = models.BooleanField(default=False)
    can_edit_events = models.BooleanField(default=False)
    can_delete_events = models.BooleanField(default=False)
    can_invite_others = models.BooleanField(default=False)

    class Meta:
        db_table = "calendar_permissions"
        unique_together = ("user", "calendar")
        db_table_comment = "Stores permissions of users for a calendar."
