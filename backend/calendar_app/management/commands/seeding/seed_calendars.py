from faker import Faker
import random
from datetime import timezone
from django.utils import timezone as dj_timezone
from calendar_app.models import Calendar, CustomUser, CalendarUser, CalendarPermissions


def seed_calendars(command):
    fake = Faker()
    users = list(CustomUser.objects.all())
    command.stdout.write("Creating 100 calendars...")
    for i in range(100):
        try:
            owner = random.choice(users)
            calendar = Calendar.objects.create(
                title=fake.sentence(nb_words=5),
                description=fake.text(),
                owner=owner,
                img=fake.image_url(),
                date_start=fake.date_time_this_year(
                    before_now=True, after_now=False, tzinfo=timezone.utc
                ),
                date_stop=fake.date_time_this_year(
                    before_now=False, after_now=True, tzinfo=timezone.utc
                ),
            )

            other_users = random.sample(users, random.randint(1, 10))
            for user in other_users:
                if user != owner:
                    CalendarUser.objects.create(
                        user=user,
                        calendar=calendar,
                        role=random.choice(["EDITOR", "VIEWER"]),
                    )
                    CalendarPermissions.objects.create(
                        user=user,
                        calendar=calendar,
                        can_view_event_details=random.choice([True, False]),
                        can_create_events=random.choice([True, False]),
                        can_edit_events=random.choice([True, False]),
                        can_delete_events=random.choice([True, False]),
                        can_invite_others=random.choice([True, False]),
                    )

            command.stdout.write(command.style.SUCCESS(f"Created calendar {i + 1}/100"))
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating calendar {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("100 calendars created."))
