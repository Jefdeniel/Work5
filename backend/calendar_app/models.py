from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth import get_user_model
from datetime import timedelta, date
import calendar as cal
from django.core.exceptions import ValidationError


class userAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a first name")
        if not last_name:
            raise ValueError("Users must have a last name")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", _("Admin")
        EDITOR = "EDITOR", _("Editor")
        VIEWER = "VIEWER", _("Viewer")

    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=50)
    last_name = models.CharField(_("last name"), max_length=50)
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff status"), default=False)
    birthday = models.DateField(_("birthday"), blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    role = models.CharField(
        max_length=50, choices=Role.choices, default=Role.VIEWER, verbose_name=_("role")
    )
    date_joined = models.DateTimeField(
        default=timezone.now, verbose_name=_("date joined")
    )

    objects = userAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

    class Meta:
        db_table = "custom_user"
        verbose_name = _("user")
        verbose_name_plural = _("users")


class Calendar(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    img = models.ImageField(upload_to="calendar_images/", blank=True, null=True)
    owner = models.ForeignKey(
        get_user_model(),
        related_name="calendars",
        on_delete=models.CASCADE,
        null=False,
    )
    users = models.ManyToManyField(
        get_user_model(),
        through="CalendarUser",
        related_name="shared_calendars",
        through_fields=("calendar", "user"),
        blank=True,
    )
    date_start = models.DateTimeField(blank=True, null=True)
    date_stop = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "calendars"
        verbose_name_plural = "Calendars"
        db_table_comment = "Stores information about the calendars of a user."

    def __str__(self):
        return self.title


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


class Category(models.Model):
    title = models.CharField(max_length=50)
    color_code = models.CharField(
        max_length=7
    )  # Assuming a hex color code like #FFFFFF
    calendar = models.ForeignKey(
        Calendar, related_name="categories", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "categories"
        db_table_comment = "Stores information about event categories for a calendar."

    def __str__(self):
        return self.title


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    owner = models.ForeignKey(
        CustomUser, related_name="user_events", on_delete=models.CASCADE
    )
    calendar = models.ForeignKey(
        Calendar, related_name="events", on_delete=models.CASCADE, blank=True, null=True
    )
    category = models.ForeignKey(
        Category,
        related_name="events",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("missed", "Missed"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    PRIORITY_CHOICES = [
        ("very_low", "Very Low"),
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("very_high", "Very High"),
    ]
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default="medium"
    )

    location = models.CharField(max_length=255, blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    recurrence_frequency = models.CharField(
        max_length=10,
        choices=[
            ("NONE", "none"),
            ("DAILY", "daily"),
            ("WEEKLY", "weekly"),
            ("BIWEEKLY", "biweekly"),
            ("MONTHLY", "monthly"),
            ("QUARTERLY", "quarterly"),
            ("YEARLY", "yearly"),
        ],
        blank=True,
        null=True,
    )
    recurrence_end_date = models.DateTimeField(blank=True, null=True)
    recurrence_interval = models.PositiveIntegerField(
        default=1
    )  # E.g., every 1 day/week/month/year
    recurrence_days_of_week = models.CharField(
        max_length=20, blank=True, null=True
    )  # Comma-separated days of the week (e.g., "MON,TUE")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "events"
        db_table_comment = (
            "Stores information about registered events of a user application."
        )
        verbose_name = "Event"
        verbose_name_plural = "Events"
        indexes = [
            models.Index(fields=["start_time"]),
            models.Index(fields=["end_time"]),
            models.Index(fields=["status"]),
            models.Index(fields=["category"]),
        ]

    def __str__(self):
        return self.title

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError("End time must be after start time")

    def get_occurrences(self, start_date, end_date):
        if not self.is_recurring:
            if self.start_time >= start_date and self.start_time <= end_date:
                return [self]
            else:
                return []

        occurrences = []
        current_occurrence = self.start_time

        while current_occurrence <= end_date:
            if current_occurrence >= start_date:
                occurrences.append(current_occurrence)

            if self.recurrence_frequency == "DAILY":
                current_occurrence += timedelta(days=self.recurrence_interval)
            elif self.recurrence_frequency == "WEEKLY":
                current_occurrence += timedelta(weeks=self.recurrence_interval)
            elif self.recurrence_frequency == "MONTHLY":
                next_month = current_occurrence.month + self.recurrence_interval
                year = current_occurrence.year + next_month // 12
                month = next_month % 12 or 12
                day = min(current_occurrence.day, cal.monthrange(year, month)[1])
                current_occurrence = current_occurrence.replace(
                    year=year, month=month, day=day
                )
            elif self.recurrence_frequency == "YEARLY":
                year = current_occurrence.year + self.recurrence_interval
                try:
                    current_occurrence = current_occurrence.replace(year=year)
                except ValueError:
                    # Handle leap year (February 29th to March 1st)
                    current_occurrence = current_occurrence.replace(
                        year=year, month=3, day=1
                    )

            if (
                self.recurrence_end_date
                and current_occurrence > self.recurrence_end_date
            ):
                break

        return occurrences


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


class Notification(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        CustomUser, related_name="notifications", on_delete=models.CASCADE
    )
    date_start = models.DateTimeField()
    date_stop = models.DateTimeField()
    is_new = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "notifications"
        db_table_comment = "Stores information about the notifications."


class UserSettings(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    language = models.CharField(max_length=50)
    time_zone = models.CharField(max_length=50)
    time_format = models.CharField(max_length=50)
    theme = models.CharField(max_length=50)
    # Reminders for own events
    event_reminder = models.BooleanField(default=False)
    # Notifications by others
    activity_notifications = models.BooleanField(default=False)
    week_start_day = models.CharField(max_length=50)
    weekend_visibility = models.BooleanField(default=False)

    class Meta:
        db_table = "user_settings"
        db_table_comment = "Stores information about the users' personal settings."


class EventOccurrence(models.Model):
    event = models.ForeignKey(
        Event, related_name="occurrences", on_delete=models.CASCADE
    )
    occurrence_time = models.DateTimeField()

    class Meta:
        db_table = "event_occurrences"
        db_table_comment = (
            "Stores information about each occurrence of a recurring event."
        )

    def __str__(self):
        return f"{self.event.title} at {self.occurrence_time}"


class TimeBlock(models.Model):
    calendar = models.ForeignKey(
        Calendar, related_name="timeblocks", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "timeblocks"
        db_table_comment = "Stores information about the timeblocks of a user."

    def __str__(self):
        return f"TimeBlock from {self.start_time} to {self.end_time} for calendar {self.calendar.title}"

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError("End time must be after start time")

    def get_occurrences(self, start_date, end_date):
        occurrences = []
        current_occurrence = self.start_time

        while current_occurrence <= end_date:
            if current_occurrence >= start_date:
                occurrences.append(current_occurrence)

            current_occurrence += timedelta(days=1)

        return occurrences
