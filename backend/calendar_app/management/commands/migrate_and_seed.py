import os
from django.core.management.base import BaseCommand
from django.core.management import call_command

# python manage.py migrate_and_seed


class Command(BaseCommand):
    help = "Runs makemigrations, migrate, and seed_data commands"

    def handle(self, *args, **options):
        # Running makemigrations
        self.stdout.write(self.style.HTTP_INFO("Creating migrations..."))
        call_command("makemigrations")

        # Running migrate
        self.stdout.write(self.style.HTTP_INFO("Applying migrations..."))
        call_command("migrate")

        # Running seed_data
        self.stdout.write(self.style.HTTP_INFO("Seeding data..."))
        call_command("seed_data")
        self.stdout.write(
            self.style.SUCCESS("Database migrated and seeded successfully!")
        )
