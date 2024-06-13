from faker import Faker
import random
from calendar_app.models import Reminder, Event, CustomUser
from datetime import timezone
from django.utils import timezone as dj_timezone


def seed_reminders(command):
    fake = Faker()
    users = list(CustomUser.objects.all())
    events = list(Event.objects.all())

    command.stdout.write("Creating 100 reminders...")
    for i in range(100):
        try:
            Reminder.objects.create(
                message=fake.sentence(nb_words=5),
                event=random.choice(events),
                time=fake.future_datetime(end_date="+30d", tzinfo=timezone.utc),
                user=random.choice(users),
            )
            command.stdout.write(command.style.SUCCESS(f"Created reminder {i + 1}/100"))
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating reminder {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("100 reminders created."))
