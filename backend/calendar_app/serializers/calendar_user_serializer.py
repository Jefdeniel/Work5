from rest_framework import serializers
from ..models import CalendarUser, CustomUser, Calendar


class CalendarUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

    class Meta:
        model = CalendarUser
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
        )
