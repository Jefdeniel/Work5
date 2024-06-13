from faker import Faker
import random
from datetime import datetime, timezone
from django.utils import timezone as dj_timezone
from django.contrib.auth.hashers import make_password
from calendar_app.models import CustomUser, UserSettings


def seed_users(command):
    fake = Faker()
    command.stdout.write("Creating or ensuring admin user 'jefdeniel'...")
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
        command.stdout.write(command.style.SUCCESS(f"Admin user 'jefdeniel' created."))
    else:
        command.stdout.write(
            command.style.SUCCESS(f"Admin user 'jefdeniel' already exists.")
        )

    command.stdout.write("Creating or ensuring admin user 'kyandrodevolder'...")
    user_kyandrodevolder, created = CustomUser.objects.get_or_create(
        email="kyandrodevolder@icloud.com",
        defaults={
            "password": make_password("admin"),
            "last_login": dj_timezone.now(),
            "is_superuser": True,
            "first_name": "Kyandro",
            "last_name": "De Volder",
            "is_staff": True,
            "is_active": True,
            "birthday": datetime(1985, 6, 15, tzinfo=timezone.utc),
            "avatar": fake.image_url(),
            "role": "ADMIN",
        },
    )
    if created:
        command.stdout.write(
            command.style.SUCCESS(f"Admin user 'kyandrodevolder' created.")
        )
    else:
        command.stdout.write(
            command.style.SUCCESS(f"Admin user 'kyandrodevolder' already exists.")
        )

    command.stdout.write("Creating 50 custom users...")
    for i in range(50):
        try:
            user = CustomUser.objects.create(
                password=make_password("defaultpassword"),
                first_name=fake.first_name(),
                is_superuser=False,
                last_name=fake.last_name(),
                role=random.choice(["ADMIN", "EDITOR", "VIEWER"]),
                email=fake.email(),
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
            UserSettings.objects.get_or_create(
                user=user,
                defaults={
                    "language": "en",
                    "time_zone": "Europe/Brussels",
                    "time_format": "24h",
                    "theme": "light",
                    "event_reminder": True,
                    "activity_notifications": True,
                    "week_start_day": "Monday",
                    "weekend_visibility": True,
                },
            )
            command.stdout.write(command.style.SUCCESS(f"Created user {i + 1}/50"))
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating user {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("50 custom users created."))
