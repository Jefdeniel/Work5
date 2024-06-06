from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
from .calendar import Calendar


class TimeBlock(models.Model):
    calendar = models.ForeignKey(
        Calendar, related_name="timeblocks", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "timeblocks"
        db_table_comment = "Stores information about the timeblocks of a user."

    def __str__(self):
        return f"TimeBlock from {self.start_time} to {self.end_time} for calendar {self.calendar.title}"

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError("End time must be after start time")

    def get_occurrences(self, start_date, end_date):
        occurrences = []
        current_occurrence = self.start_time

        while current_occurrence <= end_date:
            if current_occurrence >= start_date:
                occurrences.append(current_occurrence)

            current_occurrence += timedelta(days=1)

        return occurrences
