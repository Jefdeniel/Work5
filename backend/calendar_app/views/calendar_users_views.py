from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import CalendarUser
from ..serializers import CalendarUserSerializer
from rest_framework.views import APIView


class CalendarUsersViewSet(viewsets.ModelViewSet):
    queryset = CalendarUser.objects.all()
    serializer_class = CalendarUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()

    def get_queryset(self):
        return CalendarUser.objects.all()


class CalendarUserByUserId(APIView):
    def get(self, request, user_id):
        calendar_users = CalendarUser.objects.filter(user__id=user_id)
        if not calendar_users.exists():
            return Response(
                {"error": "CalendarUser not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = CalendarUserSerializer(calendar_users, many=True)
        return Response(serializer.data)
