from rest_framework import viewsets
from ..models import CustomUser
from ..serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    get_full_name = CustomUser.get_full_name
    get_short_name = CustomUser.get_short_name
    get_username = CustomUser.get_username
