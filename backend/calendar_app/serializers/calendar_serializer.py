from rest_framework import serializers
from ..models import Calendar


class CalendarSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=255, required=True, help_text="Title of the calendar"
    )
    description = serializers.CharField(
        max_length=255, required=False, help_text="Description of the calendar"
    )
    img = serializers.ImageField(
        required=False,
        help_text="Image associated with the calendar (binary)",
    )
    date_start = serializers.DateTimeField(
        allow_null=True,
        help_text="Start date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    date_stop = serializers.DateTimeField(
        allow_null=True,
        help_text="End date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    created_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was created"
    )
    updated_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was last updated"
    )

    class Meta:
        model = Calendar
        fields = (
            "id",
            "title",
            "description",
            "img",
            "date_start",
            "date_stop",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )
