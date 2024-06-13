from rest_framework import serializers
from ..models import TimeBlock, Calendar
from ..validators import validate_start_before_end


class TimeBlockSerializer(serializers.ModelSerializer):
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

    title = serializers.CharField(
        max_length=200, required=True, help_text="Title of the time block"
    )

    start_time = serializers.DateTimeField(
        required=True,
        help_text="Start time of the time block (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )

    end_time = serializers.DateTimeField(
        required=True,
        help_text="End time of the time block (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )

    class Meta:
        model = TimeBlock
        fields = [
            "id",
            "calendar",
            "title",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id"]

    def validate(self, data):
        return validate_start_before_end("start_time", "end_time", data)
