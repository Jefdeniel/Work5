from rest_framework import status, viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Event
from ..serializers import EventSerializer
from rest_framework.decorators import action


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Event created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "message": "Please fill the details data",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = get_object_or_404(Event, pk=kwargs.get("pk"))
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Event updated successfully", "data": serializer.data}
            )
        return Response(
            {"message": "Please fill the details data", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, *args, **kwargs):
        instance = get_object_or_404(Event, pk=kwargs.get("pk"))
        instance.delete()
        return Response(
            {"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )

    @action(detail=False, methods=["get"], url_path="calendar/(?P<calendar_id>[^/.]+)")
    def get_events_by_calendar(self, request, calendar_id=None):
        events = self.queryset.filter(calendar_id=calendar_id)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
