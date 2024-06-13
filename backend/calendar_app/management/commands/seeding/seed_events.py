from faker import Faker
import random
from datetime import timedelta, timezone
from django.core.exceptions import ValidationError
from django.db import IntegrityError, DatabaseError
from calendar_app.models import Event, Calendar, CustomUser, Category


def seed_events(command):
    fake = Faker()
    calendars = list(Calendar.objects.all())
    users = list(CustomUser.objects.all())
    categories = list(Category.objects.all())

    if not calendars or not users or not categories:
        command.stdout.write(
            command.style.ERROR(
                "Calendars, users, or categories are missing. Skipping events creation."
            )
        )
        return

    command.stdout.write("Creating 100 events...")
    for i in range(100):
        try:
            start_time = fake.future_datetime(end_date="+30d", tzinfo=timezone.utc)
            end_time = start_time + timedelta(hours=random.randint(1, 4))
            if end_time <= start_time:
                end_time = start_time + timedelta(hours(1))

            is_recurring = random.choice([True, False])
            if is_recurring:
                recurrence_frequency = random.choice(
                    ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]
                )
                if recurrence_frequency == "WEEKLY":
                    recurrence_days_of_week = ",".join(["TUE", "FRI"])
                else:
                    recurrence_days_of_week = None
                recurrence_interval = 1
                recurrence_end_date = fake.future_datetime(
                    end_date="+1y", tzinfo=timezone.utc
                )
            else:
                recurrence_frequency = None
                recurrence_interval = 1
                recurrence_days_of_week = None
                recurrence_end_date = None

            Event.objects.create(
                title=fake.sentence(nb_words=6),
                description=fake.text(),
                start_time=start_time,
                end_time=end_time,
                calendar=random.choice(calendars),
                owner=random.choice(users),
                category=random.choice(categories),
                status=random.choice(["pending", "completed", "missed"]),
                priority=random.choice(
                    ["very_low", "low", "medium", "high", "very_high"]
                ),
                is_recurring=is_recurring,
                recurrence_interval=recurrence_interval,
                recurrence_frequency=recurrence_frequency,
                recurrence_days_of_week=recurrence_days_of_week,
                recurrence_end_date=recurrence_end_date,
            )

            command.stdout.write(command.style.SUCCESS(f"Created event {i + 1}/100"))
        except (ValidationError, IntegrityError, DatabaseError) as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating event {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("100 events created."))
