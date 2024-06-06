from django.db import models
from .event import Event
from .custom_user import CustomUser


class Reminder(models.Model):
    message = models.CharField(max_length=255)
    event = models.ForeignKey(Event, related_name="reminders", on_delete=models.CASCADE)
    time = models.DateTimeField()
    user = models.ForeignKey(
        CustomUser, related_name="reminders", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f'Reminder for {self.event.title} at {self.time.strftime("%Y-%m-%d %H:%M")}'
        )
