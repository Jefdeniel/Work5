# if rest_frameworks imports can't be found: Ctrl + Shift + P -> Type and select 'Python: Select Interpreter'
# Click and selecton the Microsoft Python Interpreter


# from .utils import access_token_IsAuthenticated
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EventSerializer, ReminderSerializer, CalendarSerializer
from .models import Event, Reminder, Calendar

import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


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


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
            {"error": "Please provide both username and password"}, status=400
        )
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"invalid credentials": False}, status=400)
    login(request, user)
    return JsonResponse({"successful login": True})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "You are not logged in"}, status=400)
    logout(request)
    return JsonResponse({"successful logout": True})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"isAuthenticated": True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": None})
    return JsonResponse({"isAuthenticated": request.user.username})
