from rest_framework import viewsets
from ..models import Notification
from ..serializers import NotificationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().prefetch_related("user", "calendar")
    serializer_class = NotificationSerializer

    # Get all notifications for a user
    @action(detail=False, methods=["get"], url_path="user/(?P<user_id>[^/.]+)")
    def get_notifications_by_user(self, request, user_id=None):
        notifications = self.queryset.filter(user_id=user_id)
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data)

    # Delete all notifications for a user
    @action(
        detail=False, methods=["delete"], url_path="delete-user/(?P<user_id>[^/.]+)"
    )
    def delete_notifications_by_user(self, request, user_id=None):
        notifications = self.queryset.filter(user_id=user_id)
        notifications.delete()
        return Response(
            {"message": "Notifications deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
