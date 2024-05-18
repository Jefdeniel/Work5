from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth import get_user_model


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

        user.set_password(password)  # change password to hash
        user.save(using=self._db)  # save user to database
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
        null=True,  # DELETE THIS LINE
    )
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
    owner = models.ForeignKey(
        CustomUser, related_name="user_events", on_delete=models.CASCADE
    )
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
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "calendar_users"
        verbose_name_plural = "Calendar Users"
        unique_together = ("user", "calendar")
        db_table_comment = "Stores information about users assigned to calendars."


class Label(models.Model):
    title = models.CharField(max_length=50)
    color_code = models.CharField(max_length=50)

    class Meta:
        db_table = "labels"
        db_table_comment = "Stores information about event labels for a user."


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
    event_reminder = models.BooleanField(default=False)
    activity_notifications = models.BooleanField(default=False)
    week_start_day = models.CharField(max_length=50)
    weekend_visibility = models.BooleanField(default=False)

    class Meta:
        db_table = "user_settings"
        db_table_comment = "Stores information about the users' personal settings."
