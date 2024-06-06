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
    Category,
    Notification,
    UserSettings,
    TimeBlock,
    CalendarPermissions,
)
from django.db import IntegrityError, DatabaseError
from django.core.exceptions import ValidationError

# python manage.py seed_data


class Command(BaseCommand):
    help = "Seeds the database with 100 items for each model"

    def handle(self, *args, **options):
        fake = Faker()
        self.stdout.write("Seeding data...")

        # Ensure a specific user 'jefdeniel' always exists and is an admin
        self.stdout.write("Creating or ensuring admin user 'jefdeniel'...")
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

        # Ensure a specific user 'kyandrodevolder' always exists and is an admin
        self.stdout.write("Creating or ensuring admin user 'kyandrodevolder'...")
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
            self.stdout.write(
                self.style.SUCCESS(f"Admin user 'kyandrodevolder' created.")
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(f"Admin user 'kyandrodevolder' already exists.")
            )

        # Create 50 CustomUsers
        self.stdout.write("Creating 50 custom users...")
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
                        "language": "en",  # default language
                        "time_zone": "Europe/Brussels",  # default time zone
                        "time_format": "24h",  # default time format
                        "theme": "light",  # default theme
                        "event_reminder": True,  # default event reminder
                        "activity_notifications": True,  # default activity notifications
                        "week_start_day": "Monday",  # default week start day
                        "weekend_visibility": True,  # default weekend visibility
                    },
                )
                self.stdout.write(self.style.SUCCESS(f"Created user {i + 1}/50"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error creating user {i + 1}: {e}"))

        users = list(CustomUser.objects.all())
        self.stdout.write(self.style.SUCCESS("50 custom users created."))

        # Create 100 Calendars
        self.stdout.write("Creating 100 calendars...")
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

                # Add other users to the calendar
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

                self.stdout.write(self.style.SUCCESS(f"Created calendar {i + 1}/100"))
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error creating calendar {i + 1}: {e}")
                )

        calendars = list(Calendar.objects.all())
        self.stdout.write(self.style.SUCCESS("100 calendars created."))

        # Define the set of categories
        category_titles = [
            "personal",
            "work",
            "fitness",
            "free time",
            "family",
            "health",
            "other",
        ]

        # Create categories for each calendar
        self.stdout.write("Creating categories for each calendar...")
        for i, calendar in enumerate(calendars):
            for title in category_titles:
                try:
                    Category.objects.create(
                        title=title,
                        color_code=fake.hex_color(),
                        calendar=calendar,
                    )
                    self.stdout.write(
                        self.style.SUCCESS(f"Created category for calendar {i + 1}")
                    )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Error creating category for calendar {i + 1}: {e}"
                        )
                    )

        categories = list(Category.objects.all())
        self.stdout.write(self.style.SUCCESS("Categories created for each calendar."))

        # Create 100 Events
        self.stdout.write("Creating 100 events...")
        for i in range(100):
            try:
                start_time = fake.future_datetime(end_date="+30d", tzinfo=timezone.utc)
                end_time = start_time + timedelta(hours=random.randint(1, 4))
                if end_time <= start_time:
                    end_time = start_time + timedelta(hours=1)

                is_recurring = random.choice([True, False])
                if is_recurring:
                    recurrence_frequency = random.choice(
                        ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]
                    )
                    if recurrence_frequency == "WEEKLY":
                        recurrence_days_of_week = ",".join(["TUE", "FRI"])
                    else:
                        recurrence_days_of_week = None
                    recurrence_interval = 1  # Reset recurrence_interval when recurring
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
                    location=fake.address(),
                    is_recurring=is_recurring,
                    recurrence_frequency=recurrence_frequency,
                    recurrence_end_date=recurrence_end_date,
                    recurrence_interval=recurrence_interval,
                    recurrence_days_of_week=recurrence_days_of_week,
                )
                self.stdout.write(self.style.SUCCESS(f"Created event {i + 1}/100"))
            except ValidationError as e:
                self.stdout.write(
                    self.style.ERROR(f"ValidationError creating event {i + 1}: {e}")
                )
            except IntegrityError as e:
                self.stdout.write(
                    self.style.ERROR(f"IntegrityError creating event {i + 1}: {e}")
                )
            except DatabaseError as e:
                self.stdout.write(
                    self.style.ERROR(f"DatabaseError creating event {i + 1}: {e}")
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error creating event {i + 1}: {e}")
                )

        events = list(Event.objects.all())
        self.stdout.write(self.style.SUCCESS("100 events created."))

        # Create 100 Reminders
        self.stdout.write("Creating 100 reminders...")
        for i in range(100):
            try:
                Reminder.objects.create(
                    message=fake.sentence(nb_words=5),
                    event=random.choice(events),
                    time=fake.future_datetime(end_date="+30d", tzinfo=timezone.utc),
                    user=random.choice(users),
                )
                self.stdout.write(self.style.SUCCESS(f"Created reminder {i + 1}/100"))
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error creating reminder {i + 1}: {e}")
                )

        self.stdout.write(self.style.SUCCESS("100 reminders created."))

        # Create 100 CalendarUser relationships
        self.stdout.write("Creating 100 calendar-user relationships...")
        for i in range(100):
            try:
                user = random.choice(users)
                calendar = random.choice(calendars)

                # Use get_or_create to ensure uniqueness! (unique_together constraint)
                CalendarUser.objects.get_or_create(
                    user=user,
                    calendar=calendar,
                    defaults={"role": random.choice(["ADMIN", "EDITOR", "VIEWER"])},
                )
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created calendar-user relationship {i + 1}/100"
                    )
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(
                        f"Error creating calendar-user relationship {i + 1}: {e}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS("Calendar-user relationships creation completed.")
        )

        # Create 100 Notifications
        self.stdout.write("Creating 100 notifications...")
        for i in range(100):
            try:
                Notification.objects.create(
                    user=random.choice(users),
                    title=fake.sentence(nb_words=10),
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
                self.stdout.write(
                    self.style.SUCCESS(f"Created notification {i + 1}/100")
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error creating notification {i + 1}: {e}")
                )

        self.stdout.write(self.style.SUCCESS("100 notifications created."))

        # Create 100 TimeBlocks for calendars
        self.stdout.write("Creating 100 time blocks for calendars...")
        for i in range(100):
            try:
                start_time = fake.future_datetime(end_date="+30d", tzinfo=timezone.utc)
                end_time = start_time + timedelta(hours=random.randint(1, 4))
                if end_time <= start_time:
                    end_time = start_time + timedelta(hours=1)

                TimeBlock.objects.create(
                    calendar=random.choice(calendars),
                    start_time=start_time,
                    end_time=end_time,
                )
                self.stdout.write(self.style.SUCCESS(f"Created time block {i + 1}/100"))
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error creating time block {i + 1}: {e}")
                )

        self.stdout.write(self.style.SUCCESS("100 time blocks created."))
        self.stdout.write(self.style.SUCCESS("Data seeding completed successfully!"))
