from faker import Faker
import random
from datetime import timedelta, timezone
from calendar_app.models import TimeBlock, Calendar


def seed_time_blocks(command):
    fake = Faker()
    calendars = list(Calendar.objects.all())

    command.stdout.write("Creating 100 time blocks for calendars...")
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
            command.stdout.write(
                command.style.SUCCESS(f"Created time block {i + 1}/100")
            )
        except Exception as e:
            command.stdout.write(
                command.style.ERROR(f"Error creating time block {i + 1}: {e}")
            )

    command.stdout.write(command.style.SUCCESS("100 time blocks created."))
