from rest_framework import viewsets
from ..models import Notification
from ..serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().prefetch_related("user", "calendar")
    serializer_class = NotificationSerializer
