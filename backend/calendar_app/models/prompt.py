from django.db import models


class Prompt(models.Model):
    prompt = models.TextField(max_length=255)
    # preprompt = models.TextField()

    class Meta:
        db_table = "prompts"
        db_table_comment = "Stores information about the prompts."

    def __str__(self):
        return self.title
