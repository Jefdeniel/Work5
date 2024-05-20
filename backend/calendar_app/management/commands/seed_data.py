from django.core.management.base import BaseCommand
from faker import Faker
import random
from django.utils import timezone as dj_timezone
from datetime import datetime, timedelta, timezone
from django.contrib.auth.hashers import make_password
from calendar_app.models import (
    CustomUser,
    Calendar,
    Event,
    Reminder,
    CalendarUser,
    Label,
    Notification,
    UserSettings,
)

# python manage.py seed_data


class Command(BaseCommand):
    help = "Seeds the database with 100 items for each model"

    def handle(self, *args, **options):
        fake = Faker()
        self.stdout.write("Seeding data...")

        # Ensure a specific user 'jefdeniel' always exists and is an admin
        user_jefdeniel, created = CustomUser.objects.get_or_create(
            email="jefdeniel@icloud.com",
            defaults={
                "password": make_password("admin"),
                "last_login": dj_timezone.now(),
                "is_superuser": True,
                "first_name": "Jef",
                "last_name": "Deniel",
                "is_staff": True,
                "is_active": True,
                "birthday": datetime(1985, 6, 15, tzinfo=timezone.utc),
                "avatar": fake.image_url(),
                "role": "ADMIN",
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f"Admin user 'jefdeniel' created."))
        else:
            self.stdout.write(
                self.style.SUCCESS(f"Admin user 'jefdeniel' already exists.")
            )

        # Create 100 CustomUsers
        for _ in range(100):
            user = CustomUser.objects.create(
                password=make_password("defaultpassword"),
                first_name=fake.first_name(),
                is_superuser=False,
                last_name=fake.last_name(),
                role=random.choice(["ADMIN", "EDITOR", "VIEWER"]),
                email=fake.unique.email(),
                is_staff=False,
                is_active=True,
                birthday=fake.date_of_birth(
                    tzinfo=timezone.utc, minimum_age=18, maximum_age=90
                ),
                avatar=fake.image_url(),
                last_login=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
            )
            # Create UserSettings for each user if it doesn't already exist
            UserSettings.objects.get_or_create(
                user=user,
                defaults={
                    "language": "en",  # default language
                    "time_zone": "UTC",  # default time zone
                    "time_format": "24h",  # default time format
                    "theme": "light",  # default theme
                    "event_reminder": True,  # default event reminder
                    "activity_notifications": True,  # default activity notifications
                    "week_start_day": "Monday",  # default week start day
                    "weekend_visibility": True,  # default weekend visibility
                },
            )

        users = list(CustomUser.objects.all())

        # Create 100 Calendars
        for _ in range(100):
            Calendar.objects.create(
                title=fake.sentence(nb_words=5),
                description=fake.text(),
                owner=random.choice(users),
                img=fake.image_url(),
                date_start=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                date_stop=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
            )

        calendars = list(Calendar.objects.all())

        # Create 100 Events
        for _ in range(100):
            start_time = fake.future_datetime(end_date="+30d", tzinfo=timezone.utc)
            Event.objects.create(
                title=fake.sentence(nb_words=6),
                description=fake.text(),
                start_time=start_time,
                end_time=start_time + timedelta(hours=2),
                calendar=random.choice(calendars),
                owner=random.choice(users),
            )

        events = list(Event.objects.all())

        # Create 100 Reminders
        for _ in range(100):
            Reminder.objects.create(
                event=random.choice(events),
                time=fake.future_datetime(end_date="+30d", tzinfo=timezone.utc),
                user=random.choice(users),
            )

        # Create 100 CalendarUsers
        for _ in range(100):
            user = random.choice(users)
            calendar = random.choice(calendars)
            if not CalendarUser.objects.filter(user=user, calendar=calendar).exists():
                CalendarUser.objects.create(user=user, calendar=calendar)

        # Create 100 Labels
        for _ in range(100):
            Label.objects.create(title=fake.word(), color_code=fake.hex_color())

        # Create 100 Notifications
        for _ in range(100):
            Notification.objects.create(
                title=fake.sentence(),
                user=random.choice(users),
                date_start=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                date_stop=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
                is_new=fake.boolean(),
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully seeded the database with 100 items per model."
            )
        )
