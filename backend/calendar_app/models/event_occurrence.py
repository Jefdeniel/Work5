from django.db import models
from .event import Event


class EventOccurrence(models.Model):
    event = models.ForeignKey(
        Event, related_name="occurrences", on_delete=models.CASCADE
    )
    occurrence_time = models.DateTimeField()

    class Meta:
        db_table = "event_occurrences"
        db_table_comment = (
            "Stores information about each occurrence of a recurring event."
        )

    def __str__(self):
        return f"{self.event.title} at {self.occurrence_time}"
