from faker import Faker
from calendar_app.models import Category, Calendar


def seed_categories(command):
    fake = Faker()
    calendars = list(Calendar.objects.all())
    category_titles = [
        "personal",
        "work",
        "fitness",
        "free time",
        "family",
        "health",
        "other",
    ]

    command.stdout.write("Creating categories for each calendar...")
    for i, calendar in enumerate(calendars):
        for title in category_titles:
            try:
                Category.objects.create(
                    title=title,
                    color_code=fake.hex_color(),
                    calendar=calendar,
                )
                command.stdout.write(
                    command.style.SUCCESS(f"Created category for calendar {i + 1}")
                )
            except Exception as e:
                command.stdout.write(
                    command.style.ERROR(
                        f"Error creating category for calendar {i + 1}: {e}"
                    )
                )

    command.stdout.write(command.style.SUCCESS("Categories created for each calendar."))
