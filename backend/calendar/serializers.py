from rest_framework import serializers
from .models import Event, Reminder, Calendar

# You will need serializers to convert model instances to JSON so that the frontend can work with the received data.


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = "__all__"
