from django.db import models
from django.contrib.auth.models import User


class Calendar(models.Model):
    class Meta:
        app_label = "calendar_app"

    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, related_name="calendars", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    class Meta:
        app_label = "calendar_app"

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    creator = models.ForeignKey(User, related_name="events", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    calendar = models.ForeignKey(
        Calendar, related_name="events", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title


class Reminder(models.Model):
    class Meta:
        app_label = "calendar_app"

    event = models.ForeignKey(Event, related_name="reminders", on_delete=models.CASCADE)
    time = models.DateTimeField()
    user = models.ForeignKey(User, related_name="reminders", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Reminder for {self.event.title} - {self.user.username} - {self.time.strftime("%Y-%m-%d %H:%M")}'
