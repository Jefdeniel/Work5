from django.core.management.base import BaseCommand
from calendar_app.management.commands.seeding.seed_users import seed_users
from calendar_app.management.commands.seeding.seed_calendars import seed_calendars
from calendar_app.management.commands.seeding.seed_events import seed_events
from calendar_app.management.commands.seeding.seed_reminders import seed_reminders
from calendar_app.management.commands.seeding.seed_categories import seed_categories
from calendar_app.management.commands.seeding.seed_calendar_users import (
    seed_calendar_users,
)
from calendar_app.management.commands.seeding.seed_notifications import (
    seed_notifications,
)
from calendar_app.management.commands.seeding.seed_time_blocks import seed_time_blocks


class Command(BaseCommand):
    help = "Seeds the database with data for each model"

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

        seed_users(self)
        seed_calendars(self)
        seed_categories(self)
        seed_events(self)
        seed_reminders(self)
        seed_calendar_users(self)
        seed_notifications(self)
        seed_time_blocks(self)

        self.stdout.write(self.style.SUCCESS("Data seeding completed successfully!"))
