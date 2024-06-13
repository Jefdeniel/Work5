from faker import Faker
import random
from datetime import timezone
from django.utils import timezone as dj_timezone
from calendar_app.models import Notification, CustomUser, Calendar


def seed_notifications(command):
    fake = Faker()
    users = list(CustomUser.objects.all())
    calendars = list(Calendar.objects.all())

    if not users or not calendars:
        command.stdout.write(
            command.style.ERROR(
                "Users or calendars are missing. Skipping notifications creation."
            )
        )
        return

    command.stdout.write("Creating 100 notifications...")
    for i in range(100):
        try:
            Notification.objects.create(
                title=fake.sentence(nb_words=10),
                user=random.choice(users),
                calendar=random.choice(calendars),
                date_start=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                date_stop=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
                is_new=random.choice([True, False]),
                created_at=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                updated_at=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
            )
            command.stdout.write(
                command.style.SUCCESS(f"Created notification {i + 1}/100")
            )
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating notification {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("100 notifications created."))
