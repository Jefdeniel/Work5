from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate, login, logout


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user_id": user.pk, "username": user.username}
        )


@api_view(["POST"])
def logout_view(request):
    if not request.user.is_authenticated:
        return Response(
            {"error": "You are not logged in"}, status=status.HTTP_400_BAD_REQUEST
        )
    # Safely handle the case where the token does not exist
    if hasattr(request.user, "auth_token"):
        request.user.auth_token.delete()
    logout(request)
    return Response({"message": "Logged out successfully."})
