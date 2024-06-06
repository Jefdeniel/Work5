from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
import calendar as cal
from .custom_user import CustomUser
from .calendar import Calendar
from .category import Category


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    owner = models.ForeignKey(
        CustomUser, related_name="user_events", on_delete=models.CASCADE
    )
    calendar = models.ForeignKey(
        Calendar, related_name="events", on_delete=models.CASCADE, blank=True, null=True
    )
    category = models.ForeignKey(
        Category,
        related_name="events",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("missed", "Missed"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    PRIORITY_CHOICES = [
        ("very_low", "Very Low"),
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("very_high", "Very High"),
    ]
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default="medium"
    )

    location = models.CharField(max_length=255, blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    recurrence_frequency = models.CharField(
        max_length=10,
        choices=[
            ("NONE", "none"),
            ("DAILY", "daily"),
            ("WEEKLY", "weekly"),
            ("BIWEEKLY", "biweekly"),
            ("MONTHLY", "monthly"),
            ("QUARTERLY", "quarterly"),
            ("YEARLY", "yearly"),
        ],
        blank=True,
        null=True,
    )
    recurrence_end_date = models.DateTimeField(blank=True, null=True)
    recurrence_interval = models.PositiveIntegerField(
        default=1
    )  # E.g., every 1 day/week/month/year
    recurrence_days_of_week = models.CharField(
        max_length=20, blank=True, null=True
    )  # Comma-separated days of the week (e.g., "MON,TUE")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "events"
        db_table_comment = (
            "Stores information about registered events of a user application."
        )
        verbose_name = "Event"
        verbose_name_plural = "Events"
        indexes = [
            models.Index(fields=["start_time"]),
            models.Index(fields=["end_time"]),
            models.Index(fields=["status"]),
            models.Index(fields=["category"]),
        ]

    def __str__(self):
        return self.title

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError("End time must be after start time")

    def get_occurrences(self, start_date, end_date):
        if not self.is_recurring:
            if self.start_time >= start_date and self.start_time <= end_date:
                return [self]
            else:
                return []

        occurrences = []
        current_occurrence = self.start_time

        while current_occurrence <= end_date:
            if current_occurrence >= start_date:
                occurrences.append(current_occurrence)

            if self.recurrence_frequency == "DAILY":
                current_occurrence += timedelta(days=self.recurrence_interval)
            elif self.recurrence_frequency == "WEEKLY":
                current_occurrence += timedelta(weeks=self.recurrence_interval)
            elif self.recurrence_frequency == "MONTHLY":
                next_month = current_occurrence.month + self.recurrence_interval
                year = current_occurrence.year + next_month // 12
                month = next_month % 12 or 12
                day = min(current_occurrence.day, cal.monthrange(year, month)[1])
                current_occurrence = current_occurrence.replace(
                    year=year, month=month, day=day
                )
            elif self.recurrence_frequency == "YEARLY":
                year = current_occurrence.year + self.recurrence_interval
                try:
                    current_occurrence = current_occurrence.replace(year=year)
                except ValueError:
                    # Handle leap year (February 29th to March 1st)
                    current_occurrence = current_occurrence.replace(
                        year=year, month=3, day=1
                    )

            if (
                self.recurrence_end_date
                and current_occurrence > self.recurrence_end_date
            ):
                break

        return occurrences
