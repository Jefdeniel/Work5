from rest_framework import serializers
from ..models import CalendarUser


class CalendarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarUser
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
        )
