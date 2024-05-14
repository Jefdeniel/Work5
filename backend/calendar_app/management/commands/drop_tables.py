from django.core.management.base import BaseCommand
from django.db import connection

# python manage.py drop_tables


class Command(BaseCommand):
    help = "Drops all tables in the database"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Deleting all tables..."))
        with connection.cursor() as cursor:
            cursor.execute("DROP SCHEMA public CASCADE;")
            cursor.execute("CREATE SCHEMA public;")
        self.stdout.write(self.style.SUCCESS("All tables have been deleted."))
