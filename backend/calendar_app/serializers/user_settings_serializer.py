from rest_framework import serializers
from ..models import UserSettings


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = [
            "user",
            "language",
            "time_zone",
            "time_format",
            "theme",
            "event_reminder",
            "activity_notifications",
            "week_start_day",
            "weekend_visibility",
        ]
        read_only_fields = ("user",)

    def validate_language(self, value):
        supported_languages = ["en", "fr", "de", "nl"]
        if value not in supported_languages:
            raise serializers.ValidationError("This language is not supported.")
        return value

    def validate_time_zone(self, value):
        import pytz

        if value not in pytz.all_timezones:
            raise serializers.ValidationError("This time zone is not valid.")
        return value

    def validate_time_format(self, value):
        valid_formats = ["12h", "24h"]
        if value not in valid_formats:
            raise serializers.ValidationError("This time format is not valid.")
        return value

    def validate_theme(self, value):
        valid_themes = ["light", "dark"]
        if value not in valid_themes:
            raise serializers.ValidationError("This theme is not valid.")
        return value

    def validate_week_start_day(self, value):
        valid_days = ["Monday", "Sunday"]
        if value not in valid_days:
            raise serializers.ValidationError("This week start day is not valid.")
        return value
