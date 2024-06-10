from rest_framework import serializers
from ..models import TimeBlock, Calendar


class TimeBlockSerializer(serializers.ModelSerializer):
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

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
