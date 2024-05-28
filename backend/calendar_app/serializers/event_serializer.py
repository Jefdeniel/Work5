from rest_framework import serializers
from ..models import Event, CustomUser, Calendar, Category


class EventSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    calendar = serializers.PrimaryKeyRelatedField(
        queryset=Calendar.objects.all(), allow_null=True, required=False
    )
    title = serializers.CharField(
        max_length=200, required=True, help_text="Title of the event"
    )
    description = serializers.CharField(
        required=False, help_text="Description of the event"
    )
    start_time = serializers.DateTimeField(
        required=True,
        help_text="Start time of the event (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    end_time = serializers.DateTimeField(
        required=True,
        help_text="End time of the event (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    status = serializers.ChoiceField(
        choices=[
            ("pending", "Pending"),
            ("completed", "Completed"),
            ("missed", "Missed"),
        ],
        required=True,
        help_text="Status of the event",
    )
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=True,
        help_text="Category of the event",
    )
    priority = serializers.ChoiceField(
        choices=[
            ("very low", "Very Low"),
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
            ("very high", "Very High"),
        ],
        required=True,
        help_text="Priority of the event",
    )
    location = serializers.CharField(
        max_length=255, required=False, help_text="Location of the event"
    )
    is_recurring = serializers.BooleanField(
        required=False, help_text="Is the event recurring?"
    )
    recurrence_frequency = serializers.ChoiceField(
        choices=[
            ("NONE", "None"),
            ("DAILY", "Daily"),
            ("WEEKLY", "Weekly"),
            ("BIWEEKLY", "Biweekly"),
            ("MONTHLY", "Monthly"),
            ("QUARTERLY", "Quarterly"),
            ("YEARLY", "Yearly"),
        ],
        allow_null=True,
        required=False,
        help_text="Recurrence frequency of the event",
    )
    recurrence_interval = serializers.IntegerField(
        required=False, default=1, help_text="Recurrence interval of the event"
    )
    recurrence_end_date = serializers.DateTimeField(
        allow_null=True, required=False, help_text="Recurrence end date of the event"
    )

    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "description",
            "start_time",
            "end_time",
            "owner",
            "calendar",
            "status",
            "category",
            "priority",
            "location",
            "is_recurring",
            "recurrence_frequency",
            "recurrence_interval",
            "recurrence_end_date",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )
