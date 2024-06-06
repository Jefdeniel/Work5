from django.db import models
from .calendar import Calendar


class Category(models.Model):
    title = models.CharField(max_length=50)
    color_code = models.CharField(max_length=7)
    calendar = models.ForeignKey(
        Calendar, related_name="categories", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "categories"
        db_table_comment = "Stores information about event categories for a calendar."

    def __str__(self):
        return self.title
