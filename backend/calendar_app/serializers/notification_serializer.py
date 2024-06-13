from rest_framework import serializers
from ..models import Notification, CustomUser, Calendar
from ..validators import validate_start_before_end


class NotificationSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=255, required=True, help_text="Title of the notification"
    )
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())
    date_start = serializers.DateTimeField(
        required=True,
        help_text="Start date of the notification (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    date_stop = serializers.DateTimeField(
        required=True,
        help_text="End date of the notification (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    is_new = serializers.BooleanField(
        required=True, help_text="Is the notification new?"
    )

    class Meta:
        model = Notification
        fields = "__all__"
        read_only_fields = ("id",)

    def validate(self, data):
        return validate_start_before_end("start_time", "end_time", data)
