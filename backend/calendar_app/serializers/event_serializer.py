from rest_framework import serializers
from ..models import Event, CustomUser, Calendar

# to do: add help text, required, data validation (max length) and allow_null attributes to the fields


class EventSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    calendar = serializers.PrimaryKeyRelatedField(
        queryset=Calendar.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "description",
            "start_time",
            "end_time",
            "creator",
            "calendar",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
