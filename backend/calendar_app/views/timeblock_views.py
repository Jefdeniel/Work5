from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from ..models import TimeBlock, Calendar
from ..serializers import TimeBlockSerializer


class TimeBlockViewSet(viewsets.ModelViewSet):
    queryset = TimeBlock.objects.all()
    serializer_class = TimeBlockSerializer

    # Get all timeblocks for a specific calendar
    @action(detail=False, methods=["get"], url_path="calendar/(?P<calendar_id>\d+)")
    def list_by_calendar(self, request, calendar_id=None):
        try:
            calendar = Calendar.objects.get(id=calendar_id)
            timeblocks = TimeBlock.objects.filter(calendar=calendar)
            serializer = self.get_serializer(timeblocks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Calendar.DoesNotExist:
            return Response(
                {"detail": "Calendar not found."}, status=status.HTTP_404_NOT_FOUND
            )
