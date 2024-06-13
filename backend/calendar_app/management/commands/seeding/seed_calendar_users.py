import random
from calendar_app.models import CalendarUser, CustomUser, Calendar


def seed_calendar_users(command):
    users = list(CustomUser.objects.all())
    calendars = list(Calendar.objects.all())

    command.stdout.write("Creating 100 calendar-user relationships...")
    for i in range(100):
        try:
            user = random.choice(users)
            calendar = random.choice(calendars)

            CalendarUser.objects.get_or_create(
                user=user,
                calendar=calendar,
                defaults={"role": random.choice(["ADMIN", "EDITOR", "VIEWER"])},
            )
            command.stdout.write(
                command.style.SUCCESS(f"Created calendar-user relationship {i + 1}/100")
            )
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(
                    f"Error creating calendar-user relationship {i + 1}: {e}"
                )
            )

    command.stdout.write(
        command.style.SUCCESS("Calendar-user relationships creation completed.")
    )
