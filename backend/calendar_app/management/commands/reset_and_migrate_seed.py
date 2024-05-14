from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.db import connection

# python manage.py reset_and_migrate_seed


class Command(BaseCommand):
    help = "Drops all tables, then runs migrations and seeds the database"

    def handle(self, *args, **options):
        # Warning before dropping tables
        if (
            input("WARNING: This will drop all tables. Type 'yes' to continue: ")
            != "yes"
        ):
            self.stdout.write(self.style.ERROR("Operation cancelled."))
            return

        # Dropping all tables
        self.stdout.write(self.style.WARNING("Dropping all tables..."))
        with connection.cursor() as cursor:
            cursor.execute("DROP SCHEMA public CASCADE;")
            cursor.execute("CREATE SCHEMA public;")

        # Migrate and seed
        self.stdout.write(self.style.HTTP_INFO("Running migrate and seed commands..."))
        call_command("migrate_and_seed")
        self.stdout.write(
            self.style.SUCCESS("Database reset, migrated, and seeded successfully!")
        )
