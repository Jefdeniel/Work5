from rest_framework import serializers
from ..models import Reminder, Event, CustomUser


class ReminderSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    time = serializers.DateTimeField(
        required=True,
        help_text="Time of the reminder (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )

    class Meta:
        model = Reminder
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )
