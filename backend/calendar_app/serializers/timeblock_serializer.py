from rest_framework import serializers
from ..models import TimeBlock, Calendar


class TimeBlockSerializer(serializers.ModelSerializer):
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

    class Meta:
        model = TimeBlock
        fields = ["id", "calendar", "start_time", "end_time"]
        read_only_fields = ["id"]
