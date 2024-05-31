from rest_framework import viewsets
from ..models import CustomUser
from ..serializers import CustomUserSerializer

from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def update(self, request, *args, **kwargs):
        partial = True  # Allow partial updates
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
