from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import Calendar
from ..serializers import CalendarSerializer


class CalendarViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing calendars.
    """

    queryset = Calendar.objects.all().prefetch_related("events")
    serializer_class = CalendarSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
                {"message": "Calendar updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "Validation failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance:
            instance.delete()
            return Response(
                {"message": "Calendar deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(
            {"message": "Calendar not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    def get_queryset(self):
        queryset = super().get_queryset()
        ids = self.request.query_params.getlist("id", [])
        if ids:
            queryset = queryset.filter(id__in=ids)
        return queryset

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    # Custom action for fetching calendars by IDs
    def get_by_ids(self, request, *args, **kwargs):
        ids = self.request.query_params.getlist("id", [])
        if not ids:
            return Response(
                {"message": "No IDs provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            queryset = self.get_queryset().filter(id__in=ids)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def dispatch(self, request, *args, **kwargs):
        if "get_by_ids" in request.query_params:
            return self.get_by_ids(request, *args, **kwargs)
        return super().dispatch(request, *args, **kwargs)
