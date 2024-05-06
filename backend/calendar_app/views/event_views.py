from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from ..models import Event
from ..serializers import EventSerializer


class EventMethod(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # Hergebruik van de create-methode uit de EventSerializer
    def create(self, request, *args, **kwargs):
        event_serializer_data = EventSerializer(data=request.data)
        if event_serializer_data.is_valid():
            event_serializer_data.save()
            status_code = status.HTTP_201_CREATED
            return Response(
                {"message": "Event created successfully"}, status=status_code
            )
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(
                {"message": "Please fill the details data"}, status=status_code
            )

    # Hergebruik van de update-methode uit de EventSerializer
    def update(self, request, *args, **kwargs):
        event_data = Event.objects.get(id=kwargs["pk"])
        event_serializer_data = EventSerializer(event_data, data=request.data)
        if event_serializer_data.is_valid():
            event_serializer_data.save()
            status_code = status.HTTP_200_OK
            return Response(
                {"message": "Event updated successfully"}, status=status_code
            )
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(
                {"message": "Please fill the details data"}, status=status_code
            )
