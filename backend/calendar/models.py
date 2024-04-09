from django.db import models

# Create your models here.


class Calendar(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(
        "auth.User", related_name="calendars", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    creator = models.ForeignKey(
        "auth.User", related_name="events", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    calendar = models.ForeignKey(
        Calendar, related_name="events", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title


class Reminder(models.Model):
    event = models.ForeignKey(Event, related_name="reminders", on_delete=models.CASCADE)
    time = models.DateTimeField()
    user = models.ForeignKey(
        "auth.User", related_name="reminders", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Reminder for {self.event.title} - {self.user.username} - {self.time.strftime("%Y-%m-%d %H:%M")}'
