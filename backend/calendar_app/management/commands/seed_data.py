from django.core.management.base import BaseCommand
from faker import Faker
import random
from django.utils import timezone
from datetime import *
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


class Command(BaseCommand):
    help = "Seeds the database with 100 items for each model"

    def handle(self, *args, **options):
        fake = Faker()
        self.stdout.write("Seeding data...")

        # Create 100 CustomUsers
        for _ in range(100):
            CustomUser.objects.create(
                password=make_password("defaultpassword"),
                last_login=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                is_superuser=False,
                username=fake.user_name(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                is_staff=False,
                is_active=True,
                date_joined=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                birthday=fake.date_of_birth(
                    tzinfo=None, minimum_age=18, maximum_age=90
                ),
                avatar=fake.image_url(),
                role=random.choice(["ADMIN", "EDITOR", "VIEWER"]),
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
                end_time=start_time + timezone.timedelta(hours=2),
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
            CalendarUser.objects.create(
                user=random.choice(users), calendar=random.choice(calendars)
            )

        # Create 100 Labels
        for _ in range(100):
            Label.objects.create(title=fake.word(), color_code=fake.hex_color())

        # Create 100 Notifications
        for _ in range(100):
            Notification.objects.create(
                title=fake.sentence(),
                date_start=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                date_stop=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
                user=random.choice(users),
            )

        # Create UserSettings for each user
        for user in users:
            UserSettings.objects.create(
                user=user,
                language=fake.random.choice(["en", "nl", "fr", "de"]),
                time_zone=fake.timezone(),
                time_format=random.choice(["12h", "24h"]),
                theme=random.choice(["dark", "light"]),
                event_reminder=random.choice([True, False]),
                activity_notifications=random.choice([True, False]),
                week_start_day=random.choice(["Monday", "Sunday"]),
                weekend_visibility=random.choice([True, False]),
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully seeded the database with 100 items per model."
            )
        )
