from django.db import models
from django.contrib.auth import get_user_model


class Calendar(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    img = models.ImageField(upload_to="calendar_images/", blank=True, null=True)
    owner = models.ForeignKey(
        get_user_model(),
        related_name="calendars",
        on_delete=models.CASCADE,
        null=False,
    )
    users = models.ManyToManyField(
        get_user_model(),
        through="CalendarUser",
        related_name="shared_calendars",
        through_fields=("calendar", "user"),
        blank=True,
    )
    date_start = models.DateTimeField(blank=True, null=True)
    date_stop = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "calendars"
        verbose_name_plural = "Calendars"
        db_table_comment = "Stores information about the calendars of a user."

    def __str__(self):
        return self.title
