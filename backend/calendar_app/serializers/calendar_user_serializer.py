from rest_framework import serializers
from ..models import Calendar, CalendarUser, CustomUser


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = [
            "id",
            "title",
            "description",
            "img",
            "owner",
            "date_start",
            "date_stop",
        ]


class CalendarUserSerializer(serializers.ModelSerializer):
    calendar = CalendarSerializer(read_only=True)  # Nesting the CalendarSerializer

    class Meta:
        model = CalendarUser
        fields = ["id", "user", "calendar", "role", "created_at"]
        read_only_fields = ["id", "created_at"]
