# from .utils import access_token_IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from ..models import Calendar
from ..serializers import CalendarSerializer


# Calendars


class CalendarMethod(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

    def list(self, request, *args, **kwargs):
        data = list(Calendar.objects.all().values())
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        data = list(Calendar.objects.filter(id=kwargs["pk"]).values())
        return Response(data)

    def create(self, request, *args, **kwargs):
        calendar_serializer_data = CalendarSerializer(data=request.data)
        if calendar_serializer_data.is_valid():
            calendar_serializer_data.save()
            status_code = status.HTTP_201_CREATED
            return Response(
                {"message": "Calendar created successfully"}, status=status_code
            )
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(
                {"message": "Please fill the details data"}, status=status_code
            )

    def destroy(self, request, *args, **kwargs):
        calendar_data = Calendar.objects.get(id=kwargs["pk"])
        if calendar_data:
            calendar_data.delete()
            status_code = status.HTTP_204_NO_CONTENT
            return Response(
                {"message": "Calendar deleted successfully"}, status=status_code
            )
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response({"message": "Calendar not found"}, status=status_code)

    def update(self, request, *args, **kwargs):
        calendar_data = Calendar.objects.get(id=kwargs["pk"])
        calendar_serializer_data = CalendarSerializer(calendar_data, data=request.data)
        if calendar_serializer_data.is_valid():
            calendar_serializer_data.save()
            status_code = status.HTTP_200_OK
            return Response(
                {"message": "Calendar updated successfully"}, status=status_code
            )
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(
                {"message": "Please fill the details data"}, status=status_code
            )
