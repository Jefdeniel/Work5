from rest_framework import viewsets
from ..models import UserSettings
from ..serializers import UserSettingsSerializer


class UserSettingsViewSet(viewsets.ModelViewSet):
    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer
