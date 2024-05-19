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
