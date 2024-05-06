from django.db import models
from django.contrib.auth.models import User


class Calendar(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    img = models.BinaryField()
    date_start = models.DateTimeField(blank=True, null=True)
    date_stop = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "calendars"
        verbose_name_plural = "Calendars"
        db_table_comment = "Stores information about the calendars of a user."

    def __str__(self):
        return self.title


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    creator = models.ForeignKey(User, related_name="events", on_delete=models.CASCADE)
    calendar = models.ForeignKey(
        Calendar, related_name="events", on_delete=models.CASCADE, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "events"
        db_table_comment = (
            "Stores information about registered events of a user application."
        )
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return self.title


class Reminder(models.Model):
    event = models.ForeignKey(Event, related_name="reminders", on_delete=models.CASCADE)
    time = models.DateTimeField()
    user = models.ForeignKey(User, related_name="reminders", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Reminder for {self.event.title} - {self.user.username} - {self.time.strftime("%Y-%m-%d %H:%M")}'


class User(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=128)
    birthday = models.DateField()
    avatar = models.BinaryField(blank=True, null=True)

    class Meta:
        db_table = "users"
        verbose_name_plural = "Users"
        db_table_comment = (
            "Stores information about registered users of the application."
        )


class CalendarUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    agenda = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "calendar_users"
        verbose_name_plural = "Calendar Users"
        unique_together = ("user", "agenda")
        db_table_comment = "Stores information about users assigned to calendars."


class Label(models.Model):
    title = models.CharField(max_length=50)
    color_code = models.CharField(max_length=50)

    class Meta:
        db_table = "labels"
        db_table_comment = "Stores information about event labels for a user."


class Notification(models.Model):
    title = models.CharField(max_length=255)
    date_start = models.DateTimeField()
    date_stop = models.DateTimeField()

    class Meta:
        db_table = "notifications"
        db_table_comment = "Stores information about the notifications."


class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING, primary_key=True)
    language = models.CharField(max_length=50)
    time_zone = models.CharField(max_length=50)
    time_format = models.CharField(max_length=50)
    theme = models.CharField(max_length=50)
    event_reminder = models.BooleanField()
    activity_notifications = models.BooleanField()
    week_start_day = models.CharField(max_length=50)
    weekend_visibility = models.BooleanField()

    class Meta:
        db_table = "user_settings"
        db_table_comment = "Stores information about the users personal settings."
