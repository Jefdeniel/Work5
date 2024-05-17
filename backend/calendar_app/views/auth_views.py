from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

User = get_user_model()


@method_decorator(csrf_exempt, name="dispatch")
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        password2 = data.get("password2")

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"})
            else:
                if len(password) < 6:
                    return Response({"error": "Password must be at least 6 characters"})
                else:
                    user = User.objects.create_user(
                        email=email,
                        password=password,
                        first_name=first_name,
                        last_name=last_name,
                    )
                    user.save()
                    return Response({"success": "User created successfully"})
        else:
            return Response({"error": "Passwords do not match"})
