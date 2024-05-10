from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import Calendar
from ..serializers import CalendarSerializer


class CalendarViewset(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing calendars.
    """

    queryset = Calendar.objects.all().prefetch_related(
        "events"
    )  # Assuming a relationship to events
    serializer_class = CalendarSerializer

    def list(self, request, *args, **kwargs):
        # Utilizes the serializer for proper data representation
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Calendar created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Validation failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Calendar updated successfully", "data": serializer.data}
            )
        return Response(
            {"message": "Validation failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {"message": "Calendar deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
