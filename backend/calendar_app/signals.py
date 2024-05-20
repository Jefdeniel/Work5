from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, UserSettings


@receiver(post_save, sender=CustomUser)
def create_user_settings(sender, instance, created, **kwargs):
    if created and not UserSettings.objects.filter(user=instance).exists():
        UserSettings.objects.create(
            user=instance,
            language="en",  # default language
            time_zone="UTC",  # default time zone
            time_format="24h",  # default time format
            theme="light",  # default theme
            event_reminder=True,  # default event reminder
            activity_notifications=True,  # default activity notifications
            week_start_day="Monday",  # default week start day
            weekend_visibility=True,  # default weekend visibility
        )
