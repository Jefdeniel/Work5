# if rest_frameworks imports can't be found: Ctrl + Shift + P -> Type and select 'Python: Select Interpreter'
# Click and selecton the Microsoft Python Interpreter

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EventSerializer, ReminderSerializer, CalendarSerializer
from .models import Event, Reminder, Calendar

# Create your views here.


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class ReminderView(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    queryset = Reminder.objects.all()


class CalendarView(viewsets.ModelViewSet):
    serializer_class = CalendarSerializer
    queryset = Calendar.objects.all()


@api_view(["GET"])
def get_calendars(request):
    calendars = Calendar.objects.all()
    serializer = CalendarSerializer(calendars, many=True)
    return Response(serializer.data)
