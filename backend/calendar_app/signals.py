from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import (
    CustomUser,
    UserSettings,
    Event,
    Reminder,
    EventOccurrence,
    Calendar,
    CalendarUser,
)
from datetime import timedelta


@receiver(post_save, sender=CustomUser)
def create_user_settings(sender, instance, created, **kwargs):
    if created and not UserSettings.objects.filter(user=instance).exists():
        UserSettings.objects.create(
            # Default settings for new users
            user=instance,
            language="en",
            time_zone="UTC",
            time_format="24h",
            theme="light",
            event_reminder=True,
            activity_notifications=True,
            week_start_day="Monday",
            weekend_visibility=True,
        )


@receiver(post_save, sender=Event)
def create_reminder(sender, instance, created, **kwargs):
    if created:
        Reminder.objects.create(
            event=instance, user=instance.owner, time=instance.start_time
        )


@receiver(post_save, sender=Event)
def create_event_occurrences(sender, instance, **kwargs):
    if instance.is_recurring:
        EventOccurrence.objects.filter(
            event=instance
        ).delete()  # Clear previous occurrences
        start_date = instance.start_time
        end_date = (
            instance.recurrence_end_date
            if instance.recurrence_end_date
            else start_date + timedelta(days=365)
        )  # One year of occurrences by default

        occurrences = instance.get_occurrences(start_date, end_date)
        for occurrence in occurrences:
            EventOccurrence.objects.create(event=instance, occurrence_time=occurrence)


# create calendar_user when creating a new calendar


@receiver(post_save, sender=Calendar)
def create_calendar_user(sender, instance, created, **kwargs):
    if created:
        CalendarUser.objects.create(
            calendar=instance, user=instance.owner, role="owner"
        )
